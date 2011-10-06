#import "CarsViewController.h"
#import "CarViewController.h"
#import "Car.h"


@implementation CarsViewController

@synthesize tableView = _tableView;
@synthesize cars      = _cars;


#pragma mark -
#pragma mark LoginViewController

- (void)dealloc {
    [_tableView release];
    [_cars release];
    [super dealloc];
}


#pragma mark -
#pragma mark UIViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.title = @"Cars";
    
    // Populate list of cars
    Car *mustang = [[Car alloc] init];
    mustang.year = @"1997";
    mustang.make = @"Ford";
    mustang.model = @"Mustang GT";

    Car *wrangler = [[Car alloc] init];
    wrangler.year = @"2008";
    wrangler.make = @"Jeep";
    wrangler.model = @"Wrangler";

    Car *virage = [[Car alloc] init];
    virage.year = @"2012";
    virage.make = @"Aston Martin";
    virage.model = @"Virage";
    
    NSArray *cars = [[NSArray alloc] initWithObjects:mustang, wrangler, virage, nil];
    self.cars = cars;
    [cars release];
}

- (void)viewDidUnload {
    self.tableView = nil;
    [super viewDidUnload];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    NSIndexPath *selectedRow = [self.tableView indexPathForSelectedRow];
    [self.tableView deselectRowAtIndexPath:selectedRow animated:YES];
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
    return [self.cars count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {    
    static NSString *CellIdentifier = @"CarCell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        cell = [[[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:CellIdentifier] autorelease];
        cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    }
    
    Car *car = [self.cars objectAtIndex:indexPath.row];
    NSString *title = [NSString stringWithFormat:@"%@ %@ %@", car.year, car.make, car.model];
    cell.textLabel.text = title;
    
    // Set the Accessibility Label to something uniquely identifiable for this
    // row so the cell can be referenced label later on
    cell.accessibilityLabel = title;
    
    return cell;
}


#pragma mark -
#pragma mark UITableViewDelegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    CarViewController *carViewController = [[CarViewController alloc] initWithNibName:@"CarView" bundle:nil];
    carViewController.car = [self.cars objectAtIndex:indexPath.row];
    [self.navigationController pushViewController:carViewController animated:YES];
    [carViewController release];   
}

@end
