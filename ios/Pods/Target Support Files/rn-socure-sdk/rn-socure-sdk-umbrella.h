#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "RnSocureSdk-Bridging-Header.h"

FOUNDATION_EXPORT double rn_socure_sdkVersionNumber;
FOUNDATION_EXPORT const unsigned char rn_socure_sdkVersionString[];

