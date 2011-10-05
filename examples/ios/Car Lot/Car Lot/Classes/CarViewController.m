#import "CarViewController.h"


@implementation CarViewController

@synthesize tableView = _tableView;
@synthesize car       = _car;


#pragma mark -
#pragma mark LoginViewController

- (void)dealloc {
    [_tableView release];
    [_car release];
    [super dealloc];
}


#pragma mark -
#pragma mark UIViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.title = @"Details";
}

- (void)viewDidUnload {
    self.tableView = nil;
    [super viewDidUnload];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return YES;
}


#pragma mark -
#pragma mark UITableViewDataSource

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 3;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {    
    static NSString *CellIdentifier = @"CarCell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        cell = [[[UITableViewCell alloc] initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:CellIdentifier] autorelease];
    }
    
    if (indexPath.row == 0) {
        cell.textLabel.text = @"Year";
        cell.detailTextLabel.text = self.car.year;
    }
    else if (indexPath.row == 1) {
        cell.textLabel.text = @"Make";
        cell.detailTextLabel.text = self.car.make;        
    }
    else if (indexPath.row == 2) {
        cell.textLabel.text = @"Model";
        cell.detailTextLabel.text = self.car.model;
    }
    
    return cell;
}


#pragma mark -
#pragma mark UITableViewDelegate

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    return nil;
}

@end
