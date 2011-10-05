#import <UIKit/UIKit.h>

@interface CarsViewController : UIViewController <UITableViewDataSource,
                                                  UITableViewDelegate>

@property (nonatomic, retain) IBOutlet UITableView *tableView;
@property (nonatomic, retain) NSArray *cars;

@end
