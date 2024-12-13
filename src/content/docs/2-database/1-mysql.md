---
title: mysql
---

> 本文档使用Mysql8

## 1. 安装mysql

### debian12
denian9 开始debian官方库不再有Mysql, 只有MariaDB(Mysql的代替)

下载[apt库安装包](https://dev.mysql.com/downloads/repo/apt/), 并安装

```shell
sudo dpkg -i mysql-apt-config_0.8.29-1_all.deb
```
根据弹出的配置选项安装

安装Mysql
``` shell
sudo apt update
sudo apt install mysql-server
```

在安装时会提示输入root密码

### centos9
denian9 开始debian官方库不再有Mysql, 只有MariaDB(Mysql的代替)

下载[yum库安装包](https://dev.mysql.com/downloads/repo/yum/), 并安装

```shell
sudo yum localinstall mysql80-community-release-el9-5.noarch.rpm
```
安装Mysql
``` shell
sudo yum install mysql-community-server
```

启动Mysql
``` shell
sudo systemctl start mysqld
```

查看初始密码
``` shell
sudo grep 'temporary password' /var/log/mysqld.log
```

### 修改密码初始

登陆Mysql

``` shell
mysql -uroot -p
```

修改密码
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';
```

## 2. 忘记密码
修改Mysql配置文件`/etc/my.cnf`,跳过认证

```toml [/etc/my.cnf]
[mysqld]
skip-grant-tables
```
连接Mysql
``` shell
mysql -uroot -p
```
清空密码
```sql
UPDATE mysql.user SET authentication_string='' WHERE User='root' AND Host='localhost';
```
修改Mysql配置文件`/etc/my.cnf`, 删除`skip-grant-tables`, 重启Mysql, 再连接Mysql将没有密码
``` shell
mysql -uroot -p
```
设置新密码
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';
```

## 3. 数据库操作

### SQL分类

| 类型 | 描述 | 关键字 |
| :--- | :--- | :--- |
| DDL | 数据库定义语言, 创建和管理数据库或数据表| CREATE, ALTER, DROP |
| DML | 数据库操作语言, 操作数据| INSERT, UPDATE, DELETE |
| DQL | 数据库查询语言, 查询数据| SELECT |
| DCL | 数据库控制语言, 权限和事务控制| GRANT, REVOKE,  COMMIT, ROLLBACK |

### 数据库
```sql
SELECT database(); -- 查看当前数据库
USE db3; -- 修改当前数据库
SHOW DATABASES; -- 查看所有数据库

CREATE DATABASE `db3` CHARSET utf8mb4; -- 创建数据库
CREATE DATABASE IF NOT EXISTS `db3`; -- 如果数据库db3不存在, 创建db3
DROP DATABASE db3; -- 删除数据库
DROP DATABASE IF EXISTS db3; -- 如果db3存在, 删除db3 
ALTER DATABASE db3 CHARSET=utf8; -- 修改数据库的编码
SHOW CREATE DATABASE db3; -- 查看创建数据库的sql
```

## 4. 表

### 表引擎

```sql
SHOW ENGINES; -- 查看数据库引擎
```

| 引擎 | 支持 | 描述 | 事务 | 分布事务 | 保存点 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FEDERATED | NO | 能访问远程的MySQL数据库, 本地只保存表的结构数据, 远程保存了表的结构和数据 | null | null | null |
| BLACKHOLE | YES | 写入的数据将被丢弃 | NO | NO | NO |
| XENGINE | NO | 阿里自研的引擎 | null | null | null |
| MEMORY | YES | 基于hash存储在内存 | NO | NO | NO |
| InnoDB | DEFAULT | 支持事务, 行锁和外键 | YES | YES | YES |
| PERFORMANCE\_SCHEMA | YES | 性能表 | NO | NO | NO |
| Sequence | YES | 序列引擎 | NO | NO | NO |
| MyISAM | YES | 5.5版本之前的默认引擎, 支持表锁 | NO | NO | NO |
| MRG\_MYISAM | YES | 将多个MyISAM引擎的表聚合成一个表 | NO | NO | NO |
| CSV | YES | 数据将存储到CSV文件中 | NO | NO | NO |
| ARCHIVE | YES | 存储大量没有索引的数据 | NO | NO | NO |

### 表操作

```sql
CREATE TABLE t1(
    `id` int,
    `name` char,
    `age` int
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 
-- 创建表(ENGINE表示表的引擎, 默认是InnoDB, CHARSET是字符编码, 默认是数据库的编码)

DROP TABLE t1; -- 删除表
SHOW TABLES; -- 查看所有表
SHOW CREATE TABLE t1; -- 查看创建表的sql
DESCRIBE t1; -- 查看表结构

ALTER TABLE t1 MODIFY `name` char(20); -- 修改字段类型
ALTER TABLE t1 CHANGE Name Name char(40); -- 修改字段名称和类型
ALTER TABLE t1 ADD f1 int; -- 增加f1字段
ALTER TABLE t1 ADD f2 int FIRST; -- 将f2插入到表的第一个字段
ALTER TABLE t1 ADD f2 int AFTER f1; -- 将f2插入到f1字段后面
ALTER TABLE t1 DROP f1; -- 删除f1字段

ALTER TABLE t1 RENAME t2; -- 将表名修改为t2
ALTER TABLE t1 ENGINE=MEMORY; -- 修改表的存储引擎

CREATE TABLE t2 SELECT * FROM t1; -- 将t1复制为t2
CREATE TABLE t3 SELECT * FROM t1 WHERE FALSE; -- 只复制表结构
CREATE TABLE t4 LIKE t1; -- 复制表结构

DELETE FROM t1; -- 清空表, 自增字段不会重头开始
TRUNCATE t1; -- 清空表, 自增字段也会从头开始

```

### 约束条件

```sql
CREATE TABLE `t2` (
    f1 int NOT NULL, -- 不能为NULL
    f2 int UNIQUE, -- 不可重复(可有多个的NULL)
    f3 int DEFAULT 1, -- 默认值是1
    f4 int UNSIGNED, -- 无符号
    f5 int AUTO_INCREMENT -- 递增
);

```
外键

```sql
CREATE TABLE `leader` (
  `id` int PRIMARY KEY AUTO_INCREMENT 
);
CREATE TABLE `users` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `leader` int,
    FOREIGN KEY(leader) REFERENCES leader(id)
); -- 将users的leader字段关联到leader表的id字段

```
```sql
CREATE TABLE `leader` (
  `id` int PRIMARY KEY AUTO_INCREMENT
);
CREATE TABLE `users` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `leader` int,
    FOREIGN KEY(leader) REFERENCES leader(id) ON DELETE CASCADE 
); -- 删除leader是将同步删除users
```

```sql
CREATE TABLE `leader` (
  `id` int PRIMARY KEY AUTO_INCREMENT
);
CREATE TABLE `users` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `leader` int,
    FOREIGN KEY(leader) REFERENCES leader(id) ON UPDATE CASCADE
); -- 更新leader同步更新users
```

### 数据类型

#### 数值

***整型数字的宽度是显示的宽度要配合零填充使用, 不会影响数据的存储宽度***

| 类型 | 大小 | 有符号范围 | 无符号范围 |
| :--- | :--- | :--- | :--- |
| tinyint | 1 Byte | \[-2^7, 2^7-1\] | \[0, 2^8-1\] |
| smallint | 2 Byte | \[-2^15, 2^15-1\] | \[0, 2^16-1\] |
| mediumint | 3 Byte | \[-2^23, 2^23-1\] | \[0, 2^24-1\] |
| int | 4 Byte | \[-2^31, 2^31-1\] | \[0, 2^32-1\] |
| bigint | 8 Byte | \[-2^63, 2^63-1\] | \[0, 2^64-1\] |

浮点数
> 浮点数由符号,尾数(m), 基数(2)和指数(n)组成

> 浮点数大小 = 符号 * 尾数 * 2^指数

> 单精度(32位) = 符号位(1) + 指数(8) + 尾数(23)

> 双精度(64位) = 符号位(1) + 指数(11) + 尾数(52)

| 类型 | 大小 | 有符号范围 | 无符号范围 |
| :--- | :--- | :--- | :--- |
| float | 4 Byte (float(m,d), m是总的数字个数, d是小数后的数字个数, m最大255, d最大30) | \[-3.402 823 466^38, -1.175 494 351^-38\], 0, \[1.175 494 351^-38, 3.402 823 466^38\] | 0, [1.175 494 351^-38, 3.402 823 466^38\] |
| double | 8 Byte (double(m,d), m最大255, d最大30) | \[-1.797 693 134 862 315^308, -2.225 073 858 507 201^-308\], 0, \[2.225 073 858 507 201^-308, 1.797 693 134 862 315^308\] | 0, \[2.225 073 858 507 201^-308, 1.797 693 134 862 315^308\] |
| decimal | decimal(m, n), m最大65, n最大30 |  |  |

字符串

***一行记录最大65535个字节***
+ char(定长字符串) 最长255
> char(10) 最多存10个字符, 超过10个字符将报错, 如果不足10个字符使用空格填充(如果数据后面有空格, 获取数据时将会被丢弃)

+ varchar(变长字符串) 最长65535个字节, varchar(n) n的最大值会根据编码不同而变化
> varcher(10) 最多存10个字符,超过10个字符将报错, 如果不足10个字符不会补空格

时间类型
| 类型 | 大小 | 
| :--- | :--- |
| year | 年 |
| date | 年月日 |
| time | 时分秒 |
| datetime | 年月日时分秒(1000年-9999年) |
| timestamp | 年月日时分秒(1970年-2038年) |

枚举类型
```sql
CREATE TABLE `users` (
    gender enum('male', 'female', 'other') -- 创建枚举
);
```

集合类型

```sql
CREATE TABLE `users` (
    hobby set('say', 'song')
);
```

## 5. 记录操作

创建操作表
```sql
CREATE TABLE t1(
    `id` int,
    `name` char,
    `age` int
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

CREATE TABLE t1(
    `id` int,
    `name` char,
    `age` int,
    PRIMARY KEY (`id`)
); -- 设置主键
```
记录操作
```sql
-- 插入
INSERT INTO t1 VALUE ( 1, 'one', 20); -- 插入数据
INSERT INTO t1 VALUE ( 1, 'one', 20), (2, 'two', 30); -- 插入多条数据
INSERT INTO t1 VALUES ( 1, 'one', 20), (2, 'two', 30); -- 也可以使用VALUES

-- 删除
DELETE FROM t1 WHERE id=1; -- 删除id为1的字段

-- 修改
UPDATE t1 SET age=1 WHERE id=1; -- 将id为1的记录age修改为1

-- 查找
SELECT * FROM t1; -- 查找所有字段
SELECT `id`, `name` FROM t1; -- 查找id和name字段

```
查询测试表

```sql
CREATE TABLE `users`(
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `name` char(12) NOT NULL ,
    `age` int NOT NULL,
    `salary` int NOT NULL DEFAULT 0
);

INSERT INTO users(name, age, salary)
VALUES ('tom', 22, 3200),
       ('wu', 33, 9800),
       ('keke', 21, 5600),
       ('mj', 23, 4500),
       ('mm', 23, 3200),
       ('mome', 17, 4800),
       ('uncle', 67, 3400),
       ('zhang', 44, 5000),
       ('guoguo', 44, 5000),
       ('mei', 43, 5000),
       ('guo', 39, 4600),
       ('aa', 18, 4400),
       ('moj', 74, 4500);

```

```sql

--  去除重复项(整行数据都一样才是重复)
SELECT DISTINCT salary FROM users;
SELECT  name,salary*12 AS year_salay FROM users; -- 计算
SELECT  CONCAT('姓名: ', name), CONCAT('年薪: ', salary*12) FROM users; -- 格式化
SELECT  CONCAT_WS('-', name, age) FROM users; -- 拼接

-- where条件
SELECT name, age FROM users WHERE age < 20; -- 查询年龄小于20的用户
SELECT name, age, salary FROM users WHERE age < 20 AND salary > 4400; -- 年龄小于20并且薪资大于4400
SELECT name, age, salary FROM users WHERE age BETWEEN 20 AND 30; -- 年龄在20到30(包含20和30)
SELECT name, age, salary FROM users WHERE age < 20 OR age > 30; -- 年龄小于20或者大于30
SELECT name, age, salary FROM users WHERE age NOT BETWEEN 20 AND 30; -- 年龄不在20到30之间

-- LIKE(_匹配一个字符, %匹配0个或多个字符)
SELECT name, age, salary FROM users WHERE name LIKE 'm_';
-- 匹配mj和mm
SELECT name, age, salary FROM users WHERE name LIKE 'm%';
-- 匹配mi, mm, mome, mei和moj

-- 分组

SELECT salary FROM users GROUP BY salary; -- 按salary分组只能查询salary字段
-- 分组后常用分组分组函数(count, max, min, sum, avg)
SELECT salary, max(age) FROM users GROUP BY salary; -- 薪资相同的用户的最大年龄
SELECT group_concat(name),salary, max(age) FROM users GROUP BY salary; -- 将用户名称拼接

-- having过滤

SELECT group_concat(name),salary, max(age) FROM users GROUP BY salary HAVING max(age) > 60;
-- 分组最大年龄大于60

--- ORDER BY 排序(默认从小到大)
SELECT name, salary FROM users ORDER BY salary; -- 按照薪资从小到大
SELECT name, salary FROM users ORDER BY salary DESC; -- 按照薪资降序

-- LIMIT
SELECT name, salary FROM users LIMIT 1; -- 显示1个
SELECT id, name, salary FROM users LIMIT 0, 10; -- 从0开始取10条数据

-- 正则
SELECT id, name, salary FROM users WHERE `name` REGEXP '^m.*';

-- 常有MySQL函数

SELECT CONCAT('name: ', 'shug'); -- 字符串拼接
SELECT UPPER('hello');           -- 转换成大写
SELECT LOWER('Hello');           -- 转换成小写
SELECT LPAD('hello', 10, '-');   -- 左填充
SELECT RPAD('hello', 10, '-');   -- 右填充
SELECT TRIM(' hello ');          -- 截取空格
SELECT SUBSTRING('hello', 1, 3); -- 截取字符串

-- 数值
SELECT CEIL(1.2);        -- 向上取整
SELECT FLOOR(1.2);       -- 向下取整
SELECT MOD(100, 3);      -- 取模
SELECT RAND();           -- 获取一个0-1的随机数
SELECT ROUND(1.5);       -- 四舍五入

-- 时间
SELECT CURDATE();        -- 获取当前日期
SELECT CURTIME();        -- 获取当前时间
SELECT NOW();            -- 获取当前日期时间
SELECT YEAR('2024-1-22 23:22:00');  -- 获取年
SELECT MONTH('2024-1-22 23:22:00'); -- 获取月
SELECT DAY('2024-1-22 23:22:00');   -- 获取日
SELECT HOUR('2024-1-22 23:22:00');  -- 获取小时
SELECT MINUTE('2024-1-22 23:22:00'); -- 获取分钟
SELECT SECOND('2024-1-22 23:22:00'); -- 获取秒
SELECT DATE_ADD('2024-1-22 23:22:00', interval 1 year ); -- 加一年
SELECT DATEDIFF('2025-1-5 00:00:00', NOW());   -- 距离2025-1-1还有多少天
SELECT TIMEDIFF('2025-1-5 00:00:00', NOW());   -- 距离2025-1-1还有多少时间

-- 流程控制
SELECT name, salary, IF(salary > 5000, '平均', '被平均') FROM users; -- IF满足条件返回第二个参数不满足返回第三个参数
SELECT name, salary, CASE WHEN salary<4000 THEN '普通' WHEN salary < 6000 THEN '内部员工' ELSE '核心员工' END FROM users;

```

多表查询

```sql
-- 测试数据
CREATE TABLE `user`(
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(32) NOT NULL,
    `age` smallint UNSIGNED NOT NULL DEFAULT 0,
    `role_id` int
);

CREATE TABLE `role`(
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(12)
);

INSERT INTO user(name, age, role_id)
VALUES ('张三', 20, 1),
       ('李四', 32, 1),
       ('王五', 21, 2),
       ('赵六', 24, 1),
       ('孙七', 38, 3),
       ('吴八', 31, 2),
       ('冯九', 22, 4),
       ('马十', 42, 5);

INSERT INTO role(name)
VALUES ('匿名用户'),
       ('普通用户'),
       ('管理'),
       ('超级管理');

```

```sql

-- 内连接(user表和role表同时有的数据)
SELECT * FROM user JOIN role ON user.role_id = role.id;
SELECT * FROM user INNER JOIN role ON user.role_id = role.id;

-- 左连接(user表所有的数据, role表的数据可能不完整)
SELECT * FROM user LEFT JOIN role ON user.role_id = role.id;

-- 右连接(role表所有的数据, user表的数据可能不完整)
SELECT * FROM user RIGHT JOIN role ON user.role_id = role.id;

-- 自连接(将一张表看成两张表)
SELECT * FROM user u1 JOIN user u2 ON u1.id = u2.role_id;

```

联合查询

```sql
-- 将两个查询拼接成一次查询
SELECT * FROM user WHERE age < 22
UNION ALL  -- ALL 将包含重复项
SELECT * FROM user WHERE id < 4;

SELECT * FROM user WHERE age < 22
UNION
SELECT * FROM user WHERE id < 4;

-- 查询不同表(查询的字段数量一致)
SELECT name, age FROM user WHERE age < 22
UNION
SELECT id, name FROM role WHERE id < 4;

```

子查询

```sql

-- 表量子查询(子查询返回单个值)
SELECT * FROM user WHERE role_id=(SELECT id FROM role WHERE name='管理');

-- 列子查询(IN, NOT IN, ANY, SOME, ALL)
SELECT * FROM user WHERE role_id IN (SELECT id FROM role WHERE id < 2);
SELECT * FROM user WHERE age > ALL( SELECT age FROM user WHERE role_id = 1);

-- 行子查询(=, !=, IN, NOT IN)
SELECT * FROM user WHERE (age, role_id) = (SELECT age, role_id FROM user WHERE id = 1);

-- 表子查询(IN, NOT IN)
SELECT * FROM user WHERE (age, role_id) IN (SELECT age, role_id FROM user WHERE id < 3);
```

## 6. 用户管理

```sql
-- 查询用户
SELECT * FROM mysql.user;

-- 创建用户(创建一个用户名是test, 主机为%, 密码为123的用户)
CREATE USER 'test'@'%' IDENTIFIED BY '123';

-- 修改主机
UPDATE mysql.user SET Host='主机' WHERE User='用户名';

-- 修改密码
ALTER USER 'test'@'%' IDENTIFIED BY '456';

-- 删除用户
DROP USER 'test'@'%';
```

权限
+ ALL/ALL PRIVILEGES(所有权限)
+ INSERT(插入权限)
+ DELETE(删除权限)
+ UPDATE(更新权限)
+ SELECT(查询权限)
+ CREATE(创建数据库或表)
+ DROP(删除数据库, 表或视图)
+ ALTER(修改字段或表)

```sql
-- 查询用户权限
SHOW GRANTS FOR 'test'@'%';

-- 授予用户test, db1的所有权限
GRANT ALL ON db1.* TO 'test'@'%';

-- 取消用户test对db1的所有权限
REVOKE ALL ON db1.* FROM 'test'@'%';

FLUSH PRIVILEGES; -- 刷新权限
```

## 7. 事务

> 保证一组sql语句执行, 保存这一组sql开始执行的状态, 在提交完成之前, 可以回滚到开始执行的状态

```sql
CREATE TABLE `account` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `name` char(12),
    `balance` int
);

INSERT INTO account(name, balance) VALUES ('张三', 1000), ('李四', 1000);
```

```sql
-- 查看自动提交
SELECT @@autocommit;
SET @@autocommit = 0; -- 关闭自动提交

-- 开启事务
START TRANSACTION;
BEGIN;

-- 提交
COMMIT;

-- 回滚
ROLLBACK;
```

### 并发事务中的问题

+ 脏读
一个事务未提交的事务被另一个事务读取到
+ 不可重复读
一个事务两次读取数据不一样
+ 幻读
一个事务查询一条记录不存在, 但在插入记录时, 由发现这一条记录

| 隔离级别 | 读未提交(READ-Uncommited) | 读已提交(Read-Commited) | 可重复读(REPEATABLE-READ) | 串行(SERIALIZABLE) |
| :----- | :-- | :-- | :-- | :-- |
| 脏读 | Y | N | N | N |
| 不可重复读 | Y | Y | N | N |
| 幻读 | Y | Y | Y | N |

```sql
-- 查询事务隔离级别
SELECT @@TRANSACTION_ISOLATION;

SET SESSION TRANSACTION ISOLATION LEVEL READ-Uncommited; -- 设置会话级别的READ-Uncommited
SET GLOBAL TRANSACTION ISOLATION LEVEL Read-Commited; -- 设置全局级别的Read-Commited
```

## 8. 索引
> 索引是一种有序的数据结构, 在MySQL中索引用于加速查找数据(在加快查找的同时,会降低增删改的速度)

+ 聚集索引

存放行数据

+ 二级索引

存放的是主键id

> 使用二级索引查找数据时, 先通过二级索引查找到主键id, 再通过主键id查询聚集索引找到数据, 这个过程称为回表查询

|分类| 描述|
| :-- | :-- |
| 主键索引  |
| 唯一索引 |
| 常规索引 |
| 全文索引 |


```sql
-- 查询索引
SHOW INDEX FROM account; -- account是表名

-- 创建索引
CREATE INDEX idx_account_name ON account(name); -- idx_account_name是索引名称, account是表名, name是字段名

CREATE UNIQUE INDEX idx_account_name ON account(name); -- 创建唯一索引

CREATE INDEX idx_account_name ON account(name, balance); -- 创建联合索引

CREATE FULLTEXT INDEX idx_account_name ON account(name); -- 创建全文索引

CREATE FULLTEXT INDEX idx_account_name ON account(name) WITH PARSER ngram; -- 全文索引支持中文

-- 使用全文索引查找
SELECT * FROM account WHERE MATCH(name) against('张三');

-- 删除索引
DROP INDEX idx_account_name ON account;
```

## 9. 性能

```sql
-- 查询数据库插入次数
SHOW GLOBAL STATUS LIKE 'com_insert';
-- 查询数据库删除次数
SHOW GLOBAL STATUS LIKE 'com_delete';
-- 查询数据库更新次数
SHOW GLOBAL STATUS LIKE 'com_update';
-- 查询数据库查找次数
SHOW GLOBAL STATUS LIKE 'com_select';
```

```sql
-- 查看慢查询日志状态
SHOW VARIABLES WHERE Variable_name='slow_query_log';
SELECT @@slow_query_log;

-- 查看慢查询日志的时间
SHOW VARIABLES WHERE Variable_name='long_query_time';

-- 开启慢查询日志
SET @@global.slow_query_log=1;
```

### PROFILE

```sql
-- 检查数据库支持PROFILE
SELECT @@have_profiling;

-- 检查profile是否开启
SELECT @@profiling;
-- 开启profile
SET @@profiling=1;

-- 显示PROFILE
SHOW PROFILES;

-- 查看详情
SHOW PROFILE FOR QUERY 38;

-- 查看sql的执行
EXPLAIN SELECT * FROM account;
-- select_type 查询类型
-- type 访问类型, 与性能相关(ALL<INDEX<RANGE<REF<EQ_REF<CONST<SYSTEM<NULL)
```

### 索引失效

+ 最左前缀原则(对于联合索引)
> 查询时索引最左列的必须存在, 并且不能跳过中间的索引列, 否则后面的索引将失效

```sql
-- 示例表
CREATE TABLE `left_lay`(
    id int PRIMARY KEY AUTO_INCREMENT,
    name char(32),
    age int,
    salary int
);
INSERT INTO left_lay(name, age, salary) VALUES ('name1', 1, 100), ('name2', 2, 200),  ('name3', 3, 300),  ('name4', 4, 400);
CREATE INDEX idx_left_lay ON `left_lay`(name, age, salary);

-- 用到name, age和salary三个索引
EXPLAIN SELECT * FROM left_lay WHERE name='name1' AND age=1 AND salary=100;
-- 用到name索引
EXPLAIN SELECT * FROM left_lay WHERE name='name1' AND salary=100;
-- 用到name和age索引
EXPLAIN SELECT * FROM left_lay WHERE name='name1' AND age=1;

-- 范围查询右侧索引失效(不是在WHERE中的位置, 而是创建索引的位置)
EXPLAIN SELECT * FROM left_lay WHERE name='name1' AND age>0 AND salary=100;
```

+ 索引上进行运算操作
```sql
EXPLAIN SELECT * FROM left_lay WHERE SUBSTRING(name, 5, 1)='1';
```
前面模糊匹配
```sql
EXPLAIN SELECT * FROM left_lay WHERE name LIKE '%1';
-- 后面模糊, 索引不会失效
EXPLAIN SELECT * FROM left_lay WHERE name LIKE 'name1%';
```

+ OR条件有一侧没有索引
+ 数据分布影响(通过索引比全表扫描慢时, mysql自动选择全表扫描)

### sql提示
手动选择索引

```sql
-- 给age再创建一个索引
CREATE INDEX idx_left_lay_age ON `left_lay`(age);

-- 手动选择idx_left_lay索引
EXPLAIN SELECT * FROM left_lay USE INDEX (idx_left_lay) WHERE age=1;
-- 忽略idx_left_lay_age索引
EXPLAIN SELECT * FROM left_lay IGNORE INDEX (idx_left_lay_age) WHERE age=1;
-- 强制使用idx_left_lay索引
EXPLAIN SELECT * FROM left_lay FORCE INDEX (idx_left_lay) WHERE age=1;
```
### 覆盖索引
查询的时候使用了索引, 查询的列在索引中全部能找到, 就不需要回表查询
```sql
-- id是主键, 包含在索引里面
EXPLAIN SELECT id FROM left_lay WHERE age=1;
```

### 前缀索引

```sql
-- 截取name前12个字符创建索引
CREATE INDEX idx_left_lay_name ON `left_lay`(name(12));
```

## 10. 优化

+ INSERT优化
    - 批量插入
    ```sql
    INSERT INTO left_lay(name, age, salary) VALUES ('name1', 1, 100), ('name2', 2, 200),  ('name3', 3, 300),  ('name4', 4, 400);
    -- 如果多于1000条分成多个INSERT语句
    ```
    - 手动提交事务
    ```sql
    BEGIN;
    INSERT INTO left_lay(name, age, salary) VALUES ('name1', 1, 100), ('name2', 2, 200),  ('name3', 3, 300),  ('name4', 4, 400);
    INSERT INTO left_lay(name, age, salary) VALUES ('name1', 1, 100), ('name2', 2, 200),  ('name3', 3, 300),  ('name4', 4, 400);
    COMMIT;
    ```
    - 大量数据
    使用load导入文件
    - 主键顺序插入

+ 主键优化
    - 数据的组织方式
    根据主键的顺序存放

+ GROUP BY优化
+ ORDER BY优化
    - 通过有序索引排序, 效率高
    - 通过索引或者全表扫描, 在排序缓冲区排序, 效率慢
+ LIMIT 优化
+ count 优化
+ update 优化
    - 根据有索引的字段更新, 不然会出现表锁

## 11. 视图
一种虚拟的表, 保存查询逻辑, 不保存查询数据

```sql
-- 创建表
CREATE TABLE `view_table`(
    id int PRIMARY KEY AUTO_INCREMENT,
    name char(32),
    age int,
    salary int
);
INSERT INTO view_table(name, age, salary) VALUES ('name1', 1, 100), ('name2', 2, 200),  ('name3', 3, 300),  ('name4', 4, 400);

-- 创建视图
CREATE VIEW view_1 AS SELECT id, name FROM view_table WHERE id < 2;
-- 创建视图, 如果视图已经存在, 则替换掉旧的视图
CREATE OR REPLACE VIEW view_1 AS SELECT id, name FROM view_table WHERE id < 2;
-- 修改视图数据时, 级联检查数据是否在视图中
CREATE VIEW view_2 AS SELECT id, name, salary FROM view_1 WHERE id <= 1 WITH CASCADED CHECK OPTION;
-- 修改视图数据时, 只检查数据是否在当前视图中
CREATE VIEW view_2 AS SELECT id, name, salary FROM view_1 WHERE id <= 1 WITH LOCAL CHECK OPTION;
-- 修改视图
ALTER VIEW view_1 AS SELECT id, name, salary FROM view_table WHERE id < 2;

-- 插入数据(实际插入了基表view_table中)
INSERT INTO view_1(name, salary) VALUES ('view1', 10);
```
### 视图更新
> 视图中的行与基表中的行一一对应
如果有以下情况, 视图将不更新
1. 聚合函数或窗口函数
2. DISTINCT 去除
3. GROUP BY 分组
4. HAVING
5. UNION

### 窗口函数