#import <UIKit/UIKit.h>

@interface LoginViewController : UIViewController

@property (nonatomic, retain) IBOutlet UITextField *usernameTextField;
@property (nonatomic, retain) IBOutlet UITextField *passwordTextField;
@property (nonatomic, retain) IBOutlet UIButton *logInButton;

- (IBAction)logIn:(id)sender;

@end
