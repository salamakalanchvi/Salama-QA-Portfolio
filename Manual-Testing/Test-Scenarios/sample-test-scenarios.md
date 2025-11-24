# Sample Test Scenarios — Checkout Flow 📘

## Scenario ID 🧾  
TS-CHECKOUT-001

## Scenario Title 🎯  
Successful checkout flow

## Objective 🎯  
To verify that a standard user can complete the checkout process successfully from adding an item to placing an order.

## Preconditions 🧠  
- **User Role:** Standard user  
- **System State:** Application is accessible  
- **Login State:** User must be logged in  
- **Cart State:** No items in cart (fresh session)  

## Scenario Flow (High-Level) 🔥  
1. User logs into the application  
2. User adds an item to the cart  
3. User navigates to the Cart page  
4. User clicks **Checkout**  
5. User enters First Name, Last Name, Postal Code  
6. User continues to the overview page  
7. User clicks **Finish** to place the order  
8. System shows confirmation message  

## Expected System Behavior 📌  
- Item is added to the cart successfully  
- Checkout form accepts valid user details  
- System processes the order  
- Confirmation page displays: **"Thank you for your order!"**  

## Acceptance Criteria 🧪  
- System should allow user to add items to cart  
- System should validate checkout form fields  
- System should complete order with valid details  
- System should display confirmation message  
