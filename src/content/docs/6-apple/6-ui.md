---
title: IOS传统ui编程
---

## Storyboard

**Storyboard**是一种可视化工具，用于在Xcode中设计和管理应用程序的用户界面。它允许开发者通过拖放控件、设置约束、配置视图层次结构以及定义视图控制器之间的转场来设计UI。

优点：

- **直观可视化**：可以直接看到界面布局，适合快速设计和布局复杂的UI。
- **集成视图控制器和转场**：可以在同一个Storyboard中设计多个视图控制器及其之间的转场（Segue）。
- **自动布局支持**：Xcode提供了自动布局工具，帮助你适配不同屏幕尺寸和方向。

基本操作：

- **视图控制器**：在Storyboard中添加一个`UIViewController`，代表一个界面。
- **控件**：拖放`UILabel`、`UIButton`、`UITableView`等控件到视图控制器的视图中。
- **转场（Segue）**：在视图控制器之间添加Segue，以定义它们之间的跳转关系（如Push、Modal、Popover等）。

示例：

1. 创建一个新的视图控制器，并在其中添加一个按钮。
2. 设置按钮的约束，使其在屏幕中央。
3. 使用Control拖拽按钮到另一个视图控制器，创建一个Segue，实现从第一个视图控制器跳转到第二个视图控制器。

```objc
// 视图控制器类，绑定到Storyboard中的UIViewController
@interface ViewController : UIViewController
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
}

@end
```

## XIB

**XIB**文件（也称为NIB文件）是单个视图的界面设计文件，与Storyboard类似，但更适合用于单个视图或复用视图的设计。

优点：

- **轻量级**：适合单个视图或自定义视图的设计，文件较小，加载速度快。
- **模块化**：可以将复杂的界面拆分成多个XIB文件，便于管理和复用。

基本操作：

- **创建XIB文件**：在Xcode中创建一个新的`UIView`或`UIViewController`的XIB文件。
- **绑定类**：将XIB文件中的视图绑定到对应的视图控制器或自定义视图类。
- **加载XIB**：通过代码加载XIB文件，并将其内容添加到视图层次结构中。


### 创建项目

在iOS中，XIB（或NIB）文件是一种用于设计单个视图或视图控制器界面的文件格式。它允许开发者在不使用Storyboard的情况下设计界面元素，并且非常适合重用特定的视图组件。下面是一个逐步创建和使用XIB文件的iOS项目的指南。

#### 创建一个新的Xcode项目

**配置项目信息**：
   - **Product Name**: 例如`XibExample`
   - **Organization Name**: 例如`YourOrganization`
   - **Organization Identifier**: 例如`com.yourorganization`
   - **Language**: 选择`Objective-C`
   - **User Interface**: 选择`Storyboard`
   - 点击“Next”，然后选择项目的保存位置并点击“Create”。

#### 使用XIN文件
1. 修改`Info.plist`文件, 删除`Application Scene Manifest`/`Scene Configuration`/`Window Application Session Role`中第一个项目中的`Storyboard Name`, `Storyboard Name`的原生值应该是`Main`.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>UIApplicationSceneManifest</key>
	<dict>
		<key>UIApplicationSupportsMultipleScenes</key>
		<false/>
		<key>UISceneConfigurations</key>
		<dict>
			<key>UIWindowSceneSessionRoleApplication</key>
			<array>
				<dict>
					<key>UISceneConfigurationName</key>
					<string>Default Configuration</string>
					<key>UISceneDelegateClassName</key>
					<string>SceneDelegate</string>
				</dict>
			</array>
		</dict>
	</dict>
</dict>
</plist>
```

2. 修改`SceneDelegate.m`

```objc

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
    UIWindowScene *windowScene = (UIWindowScene *)scene;
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.windowScene = windowScene;
    
    // 设置根视图控制器
    ViewController *rootViewController = [[ViewController alloc] init];
    self.window.rootViewController = rootViewController;
    
    // 显示窗口
    [self.window makeKeyAndVisible];
}

```

#### 添加一个XIB文件

1. **创建一个新的XIB文件**：
   - 在Xcode的项目导航中，右键点击项目文件夹，选择“New File...”
   - 在文件模板选择中，选择“User Interface”下的“View”，然后点击“Next”。
   - 为你的XIB文件命名，例如`CustomView.xib`。
   - 点击“Create”创建文件。

2. **添加关联的类**：
   - 创建一个自定义`UIView`类来与其关联。
   - 右键点击项目文件夹，选择“New File...”，然后选择“Cocoa Touch Class”。
   - 为自定义类命名，例如`CustomView`，并确保它继承自`UIView`。
   - 点击“Next”并创建文件。

####  配置XIB文件

1. **打开XIB文件**：
   - 在项目导航中，找到并点击打开你刚才创建的XIB文件（例如`CustomView.xib`）。

2. **添加界面元素**：
   - 使用Interface Builder（Xcode中的图形编辑工具）在XIB文件中添加界面元素，例如`UILabel`、`UIButton`等。
   - 你可以通过拖放控件来设计界面。

3. **设置File's Owner**：
   - 在Interface Builder中，点击文件顶部的“File's Owner”图标。
   - 在右侧的“Identity Inspector”中，将Class设置为你刚才创建的类（例如`CustomView`或`CustomViewController`）。

4. **连接控件到代码**：
   - 通过`File's Owner`，你可以将XIB中的UI元素连接到你的自定义类中。按住`Control`键从UI元素拖动到代码中的`IBOutlet`声明处进行连接。
   - 例如，如果你有一个标签，你可以在`CustomView.h`中声明：

   ```objc
   @interface CustomView : UIView

   @property (nonatomic, weak) IBOutlet UILabel *label;

   @end
   ```

   然后在XIB中将标签连接到这个`IBOutlet`。

#### 加载和使用XIB文件

1. 如果是自定义UIView（CustomView）

在你的`ViewController`中，你可以加载并使用这个自定义视图：

```objc
#import "ViewController.h"
#import "CustomView.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 从XIB文件加载自定义视图
    CustomView *customView = [[[NSBundle mainBundle] loadNibNamed:@"CustomView" owner:self options:nil] firstObject];
    customView.frame = CGRectMake(50, 100, self.view.bounds.size.width - 100, 200);
    
    // 你可以配置视图的属性
    customView.label.text = @"Hello from XIB!";
    
    // 将自定义视图添加到主视图
    [self.view addSubview:customView];
}

@end
```

## 纯代码编写界面

**纯代码编写UI**是一种不依赖Storyboard或XIB文件的UI设计方法，所有的界面元素都是通过代码创建和布局的。这种方法提供了更高的灵活性和可定制性，尤其适合动态界面和高度自定义的UI。

优点：

- **完全控制**：你可以完全控制界面的每一个细节，不依赖于Xcode的UI编辑器。
- **灵活性高**：适合复杂的、动态的UI布局，尤其是在需要条件性地添加或删除视图时。
- **版本控制更容易**：代码的合并和版本控制通常比Storyboard和XIB文件更容易。

基本操作：

- **创建视图**：通过代码创建`UIView`、`UILabel`、`UIButton`等控件，并手动设置它们的属性。
- **布局视图**：使用自动布局（Auto Layout）或框架（Frame）来定位和调整视图的大小。
- **管理视图层次结构**：通过代码管理视图的添加、删除和嵌套。

### 创建项目

1. 创建一个`Storyboard`的项目
2. 修改`Info.plist`文件, 删除`Application Scene Manifest`/`Scene Configuration`/`Window Application Session Role`中第一个项目中的`Storyboard Name`, `Storyboard Name`的原生值应该是`Main`.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>UIApplicationSceneManifest</key>
	<dict>
		<key>UIApplicationSupportsMultipleScenes</key>
		<false/>
		<key>UISceneConfigurations</key>
		<dict>
			<key>UIWindowSceneSessionRoleApplication</key>
			<array>
				<dict>
					<key>UISceneConfigurationName</key>
					<string>Default Configuration</string>
					<key>UISceneDelegateClassName</key>
					<string>SceneDelegate</string>
				</dict>
			</array>
		</dict>
	</dict>
</dict>
</plist>
```

3. 修改`SceneDelegate.m`

```objc

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
    UIWindowScene *windowScene = (UIWindowScene *)scene;
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.windowScene = windowScene;
    
    // 设置根视图控制器
    ViewController *rootViewController = [[ViewController alloc] init];
    self.window.rootViewController = rootViewController;
    
    // 显示窗口
    [self.window makeKeyAndVisible];
}

```

4. 修改`ViewController.m`

```objc [ViewController.m]
#import "ViewController.h"

@interface ViewController ()

@property (nonatomic, strong) UILabel *label;
@property (nonatomic, strong) UIButton *button;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 设置背景颜色
    self.view.backgroundColor = [UIColor whiteColor];
    
    // 初始化标签
    self.label = [[UILabel alloc] initWithFrame:CGRectZero];
    self.label.text = @"Hello, World!";
    self.label.textAlignment = NSTextAlignmentCenter;
    self.label.font = [UIFont systemFontOfSize:24];
    [self.view addSubview:self.label];
    
    // 初始化按钮
    self.button = [UIButton buttonWithType:UIButtonTypeSystem];
    [self.button setTitle:@"Press Me" forState:UIControlStateNormal];
    self.button.titleLabel.font = [UIFont systemFontOfSize:18];
    [self.button addTarget:self action:@selector(buttonPressed) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.button];
    
    // 禁用自动布局转换为约束
    self.label.translatesAutoresizingMaskIntoConstraints = NO;
    self.button.translatesAutoresizingMaskIntoConstraints = NO;
    
    // 设置自动布局约束
    [NSLayoutConstraint activateConstraints:@[
        [self.label.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        [self.label.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor],
        [self.label.widthAnchor constraintEqualToAnchor:self.view.widthAnchor constant:-40],
        [self.label.heightAnchor constraintEqualToConstant:50],
        
        [self.button.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        [self.button.topAnchor constraintEqualToAnchor:self.label.bottomAnchor constant:20],
        [self.button.widthAnchor constraintEqualToAnchor:self.label.widthAnchor],
        [self.button.heightAnchor constraintEqualToConstant:50]
    ]];
}

- (void)buttonPressed {
    self.label.text = @"Button Pressed!";
}

@end
```