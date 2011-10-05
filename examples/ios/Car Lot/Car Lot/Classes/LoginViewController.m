#import "LoginViewController.h"
#import "CarsViewController.h"

@implementation LoginViewController

@synthesize usernameTextField = _usernameTextField;
@synthesize passwordTextField = _passwordTextField;
@synthesize logInButton       = _logInButton;


#pragma mark -
#pragma mark LoginViewController

- (void)dealloc {
    [_usernameTextField release];
    [_passwordTextField release];
    [_logInButton release];
    [super dealloc];
}

- (IBAction)logIn:(id)sender {
    CarsViewController *carsViewController = [[CarsViewController alloc] initWithNibName:@"CarsView" bundle:nil];
    [self.navigationController pushViewController:carsViewController animated:YES];
    [carsViewController release];
}


#pragma mark -
#pragma mark UIViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.title = @"Log In";
}

- (void)viewDidUnload {
    self.usernameTextField = nil;
    self.passwordTextField = nil;
    self.logInButton = nil;
    
    [super viewDidUnload];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return YES;
}

@end
