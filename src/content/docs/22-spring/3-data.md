---
title: Spring 数据访问
---

## 事务
Spring解决了全局事务和本地事务的缺点。它允许应用程序开发人员在任何环境中使用一致的编程模型。您编写一次代码，它就可以从不同环境中的不同事务管理策略中受益。 Spring 框架提供声明式和编程式事务管理。大多数用户更喜欢声明式事务管理，这也是我们在大多数情况下推荐的。

Spring 事务抽象的关键是事务策略的概念。事务策略由`TransactionManager`定义，特别是用于命令式事务管理的`org.springframework.transaction.PlatformTransactionManager`接口和用于反应式事务管理的`org.springframework.transaction.ReactiveTransactionManager`接口。

```java
public interface PlatformTransactionManager extends TransactionManager {

	TransactionStatus getTransaction(TransactionDefinition definition) throws TransactionException;

	void commit(TransactionStatus status) throws TransactionException;

	void rollback(TransactionStatus status) throws TransactionException;
}
```

```java
public interface ReactiveTransactionManager extends TransactionManager {

	Mono<ReactiveTransaction> getReactiveTransaction(TransactionDefinition definition) throws TransactionException;

	Mono<Void> commit(ReactiveTransaction status) throws TransactionException;

	Mono<Void> rollback(ReactiveTransaction status) throws TransactionException;
}
```

## 对象映射

### 对象创建

Spring Data 自动尝试检测持久实体的构造函数以用于具体化该类型的对象。检测顺序
1. 如果有一个用`@PersistenceCreator`注解的静态工厂方法，则使用它。
2. 只有一个构造函数，则使用它。
3. 如果有多个构造函数，并且只有一个构造函数用`@PersistenceCreator`注释，则使用它。
4. 如果类型是 Java Record则使用规范构造函数。
5. 如果有无参构造函数，则使用它。其他构造函数将被忽略。

如果类满足以下任意条件, Spring Data 将通过反射实例化实体。
- 私有类
- 非静态内部类
- CGLib 代理类
- Spring Data 使用的构造函数是私有的

Kotlin中构造函数的检测顺序
1. 如果存在使用`@PersistenceCreator`注释的构造函数，则会使用它。
2. 如果类型是Kotlin 数据类，则使用主构造函数。
3. 如果有一个用`@PersistenceCreator`注解的静态工厂方法，则使用它。
4. 如果只有一个构造函数，则使用它。
5. 如果有多个构造函数，并且只有一个构造函数用`@PersistenceCreator`注释，则使用它。
6. 如果类型是 Java Record则使用规范构造函数。
7. 如果有无参构造函数，则使用它。其他构造函数将被忽略。


### 属性填充

一旦创建了实体的实例，Spring Data 就会填充该类的所有剩余持久属性。除非已经由实体的构造函数填充（即通过其构造函数参数列表使用），否则将首先填充标识符属性以允许解析循环对象引用。之后，构造函数尚未填充的所有非瞬态属性都会在实体实例上设置。属性填充顺序

1. 如果属性是不可变的，但公开了with…方法，使用with…方法来创建具有新属性值的新实体实例。
2. 如果定义了属性访问（即通过 getter 和 setter 进行访问），将调用 setter 方法。
3. 如果属性是可变的，直接设置字段。
4. 如果属性是不可变的，将使用持久性操作使用的构造函数来创建实例的副本。
5. 默认情况下，直接设置字段值。

Kotlin中属性填充, 在 Kotlin 中，默认情况下所有类都是不可变的，并且需要显式属性声明来定义可变属性。考虑以下data类, kotlin的data类实际上是不可变的。它允许创建新实例，因为 Kotlin 生成一个copy(…)方法，该方法创建新对象实例，从现有对象复制所有属性值并将作为参数提供的属性值应用到该方法。


### 实例

```java
package site.shug.spring.common.dao;

import org.springframework.data.annotation.AccessType;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Table;

// 用于配置从类到数据库表的映射的注释。
@Table
public class User {
	// 标识主键
    @Id
    private final Long id;
    private @AccessType(AccessType.Type.PROPERTY) String name; // 使用setName方法设置值
    private @AccessType(AccessType.Type.FIELD) String nickname; // 使用字段访问设置值
	// 默认使用字段访问设置值
    private int age;

	// 忽略password字段
    @Transient
    private String password;

	// 无参数的工厂函数
    @PersistenceCreator
    public static User userFactory() {
        System.out.println("工厂函数");
        return new User(1L);
    }

	// 带参数的工厂函数
	// @PersistenceCreator
    public static User userFactory1(String name) {
        System.out.println("userFactory1工厂函数: name = " + name);
        return new User(1L, name, 1);
    }


    // @PersistenceCreator
    public User(Long id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
        System.out.println("有参构造函数: " + this);
    }
    public User(Long id) {
        this.id = id;
    }

    public User withId(Long id) {
        System.out.println("withId: " + id);
        return new User(id, name, age);
    }
    public void setAge(int age) {
        System.out.println("注入age属性: " + age);
        this.age = age;
    }
    public int getAge() {
        return age;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        System.out.println("注入name属性: " + name);
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", age=" + age +
                ", password='" + password + '\'' +
                '}';
    }
}
```

使用record类
```java
package site.shug.spring.common.dao;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * - Record 是 `final` 的，不能被继承。
 * - Record 不能有非 `final` 字段。
 * - Record 只能实现接口，不能继承其他类。
*/
@Table
public record RecordUser(@Id Long id, String name, String nickname, int age) {
}

```

## 使用

### 核心理念

Spring Data存储库抽象中的中心接口是`Repository` 。它需要管理域类以及域类的标识符类型作为类型参数。该接口主要充当标记接口，用于捕获要使用的类型并帮助您发现扩展该接口的接口。 `CrudRepository`和`ListCrudRepository`接口为正在管理的实体类提供复杂的 CRUD 功能。

```java
/**
 * 
 *  T表示实体的类型, ID标识符类型(主键)
 * 
*/
public interface CrudRepository<T, ID> extends Repository<T, ID> {

  <S extends T> S save(S entity); // 保存给定的实体。

  Optional<T> findById(ID primaryKey); // 返回由给定 ID 标识的实体。

  Iterable<T> findAll(); // 返回所有实体。

  long count(); // 返回实体的数量。

  void delete(T entity); // 删除给定实体。

  boolean existsById(ID primaryKey); // 指示是否存在具有给定 ID 的实体。

  // 列出部分关键内容
}
```

Spring Data还提供持久性技术特定的抽象，例如`JpaRepository`或`MongoRepository` 。这些接口扩展了`CrudRepository`并公开了底层持久性技术的功能以及相当通用的与持久性技术无关的接口, 
还有`PagingAndSortingRepository`和`ListPagingAndSortingRepository`添加了其他方法来简化对实体的分页访问.


## 定义Repository接口

典型的方法是扩展CrudRepository ，它为您提供 CRUD 功能的方法。 常见的`Repository`:
- CrudRepository: 它为您提供 CRUD 功能的方法。
- ListCrudRepository: 与`CrudRepository`非常相似，但对于那些返回多个实体的方法，它返回一个`List`
- ReactiveCrudRepository: Reactive响应式框架中使用
- RxJava3CrudRepository: RxJava响应式框架中使用
- CoroutineCrudRepository: 支持Kotlin 协程
- PagingAndSortingRepository: 简化对实体的分页访问
- ListPagingAndSortingRepository: 简化对实体的分页访问

如果不想扩展 Spring Data 接口，您还可以使用@RepositoryDefinition注解您的存储库接口。
如果应用程序中的许多存储库应该具有相同的方法集，您可以定义自己的基接口来继承。这样的接口必须使用@NoRepositoryBean注解。这可以防止 Spring Data 尝试直接创建它的实例并失败，因为它无法确定该存储库的实体，因为它仍然包含通用类型变量。

### 多个Spring Data模块

在应用程序中使用独特的 Spring Data 模块使事情变得简单，因为定义范围内的所有存储库接口都绑定到 Spring Data 模块。有时，应用程序需要使用多个 Spring Data 模块。在这种情况下，存储库定义必须区分持久性技术。当它在类路径上检测到多个存储库工厂时，Spring Data 会进入严格的存储库配置模式。严格配置使用存储库或域类的详细信息来决定存储库定义的 Spring Data 模块绑定：

1. 如果Repository定义扩展了特定于模块的Repository，那么它是特定 Spring Data 模块的有效候选者。
2. 如果实体类使用特定于模块的类型注释进行注释，那么它是特定 Spring Data 模块的有效候选者。 

特定于模块的存储库：
1. JpaRepository: JPA 模块

特定于模块的类型注释:
1. Entity: JPA 模块
2. Document: MongoDB 模块


Repository的开启注解
1. EnableJdbcRepositories: JDBC 模块
2. EnableR2dbcRepositories: R2DBC 模块
3. EnableJpaRepositories: JPA 模块
4. EnableLdapRepositories: LDAP 模块
5. EnableMongoRepositories: MongoDB 模块
6. EnableRedisRepositories: Redis 模块
7. EnableCassandraRepositories: Cassandra 模块
8. EnableCouchbaseRepositories: Couchbase 模块
9. EnableElasticsearchRepositories: Elasticsearch 模块
10. EnableNeo4jRepositories: Neo4j 模块

### 定义查询方法

#### 通过直接从方法名称派生查询

存储库基础结构可使用以下策略来解决查询。使用 XML 配置，您可以通过`query-lookup-strategy`属性在命名空间配置策略。对于 Java 配置，您可以使用`EnableJpaRepositories`注释的`queryLookupStrategy`属性。特定数据存储可能不支持某些策略。

- `CREATE`: 尝试根据查询方法名称构造特定于存储的查询。一般方法是从方法名称中删除一组给定的众所周知的前缀并解析方法的其余部分。
- `USE_DECLARED_QUERY`: 尝试查找已声明的查询，如果找不到，则抛出异常。
- `CREATE_IF_NOT_FOUND`: 默认）结合了CREATE和USE_DECLARED_QUERY 。它首先查找已声明的查询，如果未找到已声明的查询，则会创建一个基于自定义方法名称的查询。

从方法名称创建查询, 解析查询方法名分为主语和谓语。第一部分（ find…By 、 exists…By ）定义查询的主题，第二部分形成谓词。引导子句（主语）可以包含进一步的表达。 find （或其他引入关键字）和By之间的任何文本都被认为是描述性的，除非使用结果限制关键字之一，例如Distinct在要创建的查询上设置不同标志或Top / First来限制查询结果。


查询方法主语关键字:

| 主语关键词 | 介绍 |
| ---- | ---- |
| `find…By`, `read…By`, `get…By`, `query…By`, `search…By`, `stream…By` | 一般查询方法通常返回存储库类型、 Collection或Streamable子类型或结果包装器，例如Page 、 GeoResults或任何其他特定于商店的结果包装器。可以用作findBy… 、 findMyDomainTypeBy…或与其他关键字结合使用。 |
| `exists…By` | 存在投影，通常返回boolean结果。|
| `count…By` | 返回数字结果的计数投影。 |
| `delete…By`, `remove…By` | 删除查询方法不返回结果 ( void ) 或返回删除计数。|
| `…First<number>…`, `…Top<number>…` | 将查询结果限制为前<number>结果。该关键字可以出现在主题中find （和其他关键字）和by之间的任何位置。|
| `…Distinct…` | 使用不同的查询仅返回唯一的结果。请参阅存储库特定文档是否支持该功能。该关键字可以出现在主题中find （和其他关键字）和by之间的任何位置。 |

查询谓词关键字:

| 过滤谓词关键字 | 关键词表达式 |
| ----- | ----- |
| `AND` | `And` |
| `OR` | `Or` |
| `AFTER` | `After`, `IsAfter` |
| `BEFORE` | `Before`, `IsBefore` |
| `CONTAINING` | `Containing`, `IsContaining`, `Contains` |
| `BETWEEN` | `Between`, `IsBetween` |
| `ENDING_WITH` | `EndingWith`, `IsEndingWith`, `EndsWith` |
| `EXISTS` | `Exists` |
| `FALSE` | `False`, `IsFalse` |
| `GREATER_THAN` | `GreaterThan`, `IsGreaterThan` |
| `GREATER_THAN_EQUALS` | `GreaterThanEqual`, `IsGreaterThanEqual` |
| `IN` | `In`, `IsIn` |
| `IS` | 	`Is`, `Equals`, (或没有关键字) |
| `IS_EMPTY` | `IsEmpty`, `Empty` |
| `IS_NOT_EMPTY` | `IsNotEmpty`, `NotEmpty` |
| `IS_NOT_NULL` | `NotNull`, `IsNotNull` |
| `IS_NULL` | `Null`, `IsNull` |
| `LESS_THAN` | `LessThan`, `IsLessThan` |
| `LESS_THAN_EQUAL` | `LessThanEqual, `IsLessThanEqual` |
| `LIKE` | `Like`, `IsLike` |
| `NEAR` | `Near`, `IsNear` |
| `NOT` | `Not`, `IsNot` |
| `NOT_IN` | `NotIn`, `IsNotIn` |
| `NOT_LIKE` | `NotLike`, `IsNotLike` |
| `REGEX` | `Regex`, `MatchesRegex`, `Matches` |
| `STARTING_WITH` | `StartingWith`, `IsStartingWith`, `StartsWith` |
| `TRUE` | `True`, `IsTrue` |
| `WITHIN` | `Within`, `IsWithin` |

| 其余谓词关键字 | 介绍 |
| ----- | ----- |
| `IgnoreCase`, `IgnoringCase` | 与谓词关键字一起使用以进行不区分大小写的比较。 |
| `AllIgnoreCase`, `AllIgnoringCase` | 忽略所有合适属性的大小写。在查询方法谓词中的某处使用。 |
| `OrderBy…` | 指定静态排序顺序，后跟属性路径和方向（例如`OrderByFirstnameAscLastnameDesc` ）。 |


```java
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    // List可以替换成`Set`, `Iterable`, `Streamable`
    List<User> findByNameContaining(String username);
    // 异步查询结果
    // @Async
    //Future<User> findByFirstname(String firstname);
    //@Async
    //CompletableFuture<User> findOneByFirstname(String firstname);

    // 识别某些特定类型，例如Pageable 、 Sort和Limit ，以便动态地将分页、排序和限制应用于您的查询。
    Page<User> findByName(String name, Pageable pageable);

    // Slice<User> findByLastname(String lastname, Pageable pageable);
    // List<User> findByLastname(String lastname, Sort sort);
    // List<User> findByLastname(String lastname, Sort sort, Limit limit);
    // List<User> findByLastname(String lastname, Pageable pageable);
}
```

大型查询结果:

| 返回类型 | 获取的数据量 | 查询结构 | 约束条件 |
| ---- | ------ | ----- | ---- |
| `List<T>` | 所有结果。| 单一查询。 | 查询结果可能会耗尽所有内存。获取所有数据可能非常耗时。|
| `Streamable<T>` | 所有结果。| 单一查询。 | 查询结果可能会耗尽所有内存。获取所有数据可能非常耗时。|
| `Stream<T>` | 根据Stream消耗进行分块（逐一或分批）。| 通常使用游标的单个查询。 | 流在使用后必须关闭以避免资源泄漏。。|
| `Flux<T>` | 根据Flux消耗量分块（逐一或分批）。| 通常使用游标的单个查询。 | 存储模块必须提供反应式基础设施。|
| `Slice<T>` | `Pageable.getPageSize() + 1` 在 `Pageable.getOffset()`处 | 一对多查询从`Pageable.getOffset()`应用限制开始获取数据。 | 当偏移量太大时，基于偏移量的查询会变得低效，因为数据库仍然必须实现完整的结果。|
| `Page<T>` | `Pageable.getPageSize()`和`Pageable.getOffset()` | 从`Pageable.getOffset()`开始应用限制的一对多查询。此外，可能需要`COUNT(…)`查询来确定元素的总数。 | 很多时候，需要`COUNT(…)`查询，但成本高昂。|


