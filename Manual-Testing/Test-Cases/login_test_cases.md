# Login Feature — Test Cases 🔐  
*Application: Sauce Demo*  
*Module: Authentication*  
*Prepared by: Salama Kalanchvi*  

---

> **Personal Note:**  
> I wrote these test cases during my first QA role when I was learning test case design. At the time, I was documenting everything manually because I didn't know automation yet. Looking back now, I'd automate TC-Login-001 and TC-Checkout-002 (the happy paths) and keep only edge cases and negative scenarios manual. But this process taught me how to think through preconditions, test data, and expected results—which made writing automation tests way easier later.
>
> **What I'd change today:** I'd add more security-focused test cases (SQL injection attempts, XSS in input fields, session timeout scenarios) and API-level validation instead of just UI checks.

---

## Test Case Summary 📌
| Field | Detail |
|-------|--------|
| **Feature Name** | Login |
| **Module** | User Authentication |
| **Prepared By** | Salama Kalanchvi |
| **Last Updated** | 2025-11-16 |

---

# Detailed Test Cases ✔️

## Test Case ID 📌  
TC-Login-001

## Title 🎯  
Verify user login functionality using valid credentials.

## Description 📝  
This test verifies that a valid, active user can successfully log into the application using correct username and password. It ensures proper authentication, session handling, and redirection to the homepage.

## Preconditions 👥  
- User account must exist with valid credentials.  
- User must not be locked or disabled.  
- Application is accessible.  
- Browser session is cleared (no stored cookies).  
- Internet connection available.  

## Test Data ⚙️  
- Username: `standard_user`  
- Password: `secret_sauce`  
- Edge Case Value: Username with trailing spaces `" standard_user "`  
- Negative Value: Wrong password `"incorrect123"`  

## Steps to Execute 🚀  
1. Navigate to the login page: `https://www.saucedemo.com/`  
2. Enter valid username in the Username field.  
3. Enter valid password in the Password field.  
4. Click on the **Login** button.  
5. Observe system behavior and redirection.  

## Expected Result ✅  
- User should be authenticated successfully.  
- User should be redirected to the **Products** page.  
- Shopping cart icon should be visible.  
- No error messages should be displayed.  

## Alternate / Negative Expected Result ❌  
- Wrong password → Show message: *"Username and password do not match."*  
- Empty username → Show message: *"Username is required."*  
- Empty password → Show message: *"Password is required."*  

## Post-Conditions 🔍  
- A new login session is created.  
- User stays logged in until logout or timeout.  

## Evidence (Optional) 🖼️  
- Screenshot of successful login screen.  
- Screenshot of login request (Status: 200 OK).  

---

## Test Case ID 📌  
TC-Checkout-002

## Title 🎯  
Verify successful checkout with valid customer information.

## Description 📝  
This test validates that a user can complete the checkout process using correct personal details. It verifies form validation, order processing, and the final confirmation page.

## Preconditions 👥  
- User must be logged in.  
- User must have at least one product in the cart.  
- Checkout page should be accessible.  
- Payment/Order service must be available.  

## Test Data ⚙️  
- First Name: `Salama`  
- Last Name: `Awan`  
- Postal Code: `54000`  
- Edge Case Value: `"01234"`  
- Negative Value: Empty postal code  

## Steps to Execute 🚀  
1. Add at least one item to the cart.  
2. Navigate to the Cart page.  
3. Click on the **Checkout** button.  
4. Enter First Name, Last Name, and Postal Code.  
5. Click **Continue**.  
6. Review order summary.  
7. Click **Finish** to place the order.  

## Expected Result ✅  
- Order is processed successfully.  
- User sees a message: **"Thank you for your order!"**  
- Confirmation page is displayed.  
- Order summary matches selected items.  

## Alternate / Negative Expected Result ❌  
- Empty Postal Code → Show error: *"Postal Code is required."*  
- Invalid Postal Code → Validation error shown.  
- System must not proceed without valid input.  

## Post-Conditions 🔍  
- Order record created in system.  
- Inventory quantities reduced.  
- User can view order in Order History.  

## Evidence (Optional) 🖼️  
- Screenshot of confirmation page.  
- Network request showing order created (Status: 201 Created).  
