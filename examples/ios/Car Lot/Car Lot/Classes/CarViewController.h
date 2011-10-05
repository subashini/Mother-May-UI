#import <UIKit/UIKit.h>
#import "Car.h"


@interface CarViewController : UIViewController <UITableViewDataSource,
                                                 UITableViewDelegate>

@property (nonatomic, retain) IBOutlet UITableView *tableView;
@property (nonatomic, retain) Car *car;

@end
