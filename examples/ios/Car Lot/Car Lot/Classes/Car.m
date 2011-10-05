#import "Car.h"

@implementation Car

@synthesize year  = _year;
@synthesize make  = _make;
@synthesize model = _model;


#pragma mark -
#pragma mark Car

- (void)dealloc {
    [_year release];
    [_make release];
    [_model release];
    [super dealloc];
}

@end
