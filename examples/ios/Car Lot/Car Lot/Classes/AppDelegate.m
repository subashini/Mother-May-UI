#import "AppDelegate.h"


@implementation AppDelegate

@synthesize window               = _window;
@synthesize navigationController = _navigationController;


#pragma mark -
#pragma mark AppDelegate

- (void)dealloc {
    [_window release];
    [_navigationController release];
    [super dealloc];
}


#pragma mark -
#pragma mark UIApplicationDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [self.window addSubview:self.navigationController.view];
    [self.window makeKeyAndVisible];

    return YES;
}

@end
