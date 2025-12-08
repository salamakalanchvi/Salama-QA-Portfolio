# Test Plan 📄  
Project: Sauce Demo – End-to-End Web Application Testing  
Prepared By: Salama Kalanchvi  
Last Updated: 2025-11-16  

---

# Purpose 🎯  
The purpose of this Test Plan is to define the testing approach for validating the core functionality of the Sauce Demo web application.  
This document focuses primarily on **manual testing**, while automation is used only to support repetitive regression workflows.

---

# Scope 🧠  

## In Scope  
- Login authentication  
- Inventory listing and sorting  
- Add to cart and remove from cart  
- Checkout process and form validation  
- Order confirmation  
- UI and UX validation  
- Negative and edge-case scenarios  
- Basic API validation (next iteration)  

## Out of Scope  
- Load and performance testing  
- Security and penetration testing  
- Database-level validations  
- Mobile responsiveness (phase 2)  
- Localization testing  

---

# Test Environment 🖥️  
- Browsers: Chrome, Firefox  
- Operating Systems: Windows 10/11, macOS  
- Devices: Desktop only (mobile in next phase)  
- Test Accounts: Standard user, Locked-out user, Problem user  
- Tools Installed: Browser DevTools, Postman, Playwright  

---

# User Roles 🧍  
- Standard User  
- Locked-Out User  
- Problem User  
- Admin (future roadmap)  

---

# Entry Criteria 🚪  
- Requirements are approved and finalized  
- Test environment is accessible and stable  
- Valid test data is prepared  
- Build is deployed successfully  
- Smoke tests pass before main execution  
- No blocking bugs open from previous cycles  

---

# Exit Criteria 🏁  
- All P0 and P1 test cases passed  
- No high-severity defects open  
- Regression suite stable  
- All failed tests either fixed or accepted as known issues  
- Test summary report completed  

---

# Assumptions & Dependencies 🔗  
- Backend APIs will remain stable during test execution  
- Required test data will be available before execution  
- Developers will provide timely support for defect fixes  
- Network/environment downtime will be minimal  
- UI changes will be communicated before implementation  

---

# Testing Types 🛠️  
- Functional testing  
- Smoke testing  
- Regression testing  
- UI and UX testing  
- Negative and boundary testing  
- Basic API testing  
- Cross-browser testing (Chrome, Firefox)  

---

# Test Deliverables 🗂️  
- Test scenarios  
- Test cases  
- Bug reports  
- Requirement Traceability Matrix (RTM)  
- Test execution report  
- Test summary report  
- Screenshots and logs  

---

# Test Strategy 🧪  

## Approach  
- Test cases follow a consistent and structured template.  
- Coverage includes positive, negative, and edge-case scenarios.  
- Each feature is validated end-to-end before being included in regression.  
- Defects are logged with severity, priority, and detailed reproduction steps.  
- Automation (Playwright) supports repetitive regression flows.  

## Tools Used 🧰  
- Excel / Google Sheets (test cases, RTM)  
- Jira (bug tracking)  
- Playwright (automation support)  
- GitHub (version control)  
- Postman (API validation)  

## Test Data Strategy  
- Test data stored in a dedicated, organized section.  
- Reusable datasets for login, cart, and checkout scenarios.  
- Boundary values included: blank fields, special characters, long inputs.  

## Pass / Fail Criteria  
- Expected results must match actual behavior  
- No P0 or P1 failures allowed  
- Validation errors must align with requirements  

---

# Risks & Mitigations 🧾  

## Risk 1: Frequent UI changes may break test cases  
- **Mitigation:** Modular test design + early collaboration with developers  

## Risk 2: Incorrect test data may cause false failures  
- **Mitigation:** Maintain centralized and reviewed datasets  

## Risk 3: Environment instability  
- **Mitigation:** Execute smoke tests before full regression to verify stability  

---

# Testing Timeline 📅  
- **Planning:** Week 1  
- **Test Design:** Week 1–2  
- **Execution:** Week 2–3  
- **Bug Fixing:** Week 3  
- **Regression:** Week 4  