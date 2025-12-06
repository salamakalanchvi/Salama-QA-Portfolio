# 🐞 Bug Report: BUG-AUTH-047

## Metadata

**Author:** Salama Kalanchvi  
**Date Reported:** 2024-03-22  
**Product/Module:** User Authentication System  
**Environment:** Staging (found during regression testing)  
**Status:** ✅ Fixed (Deployed 2024-03-25)  

---

## 🐛 Bug Summary

Session timeout not enforced correctly—users remain logged in beyond configured 30-minute idle timeout, exposing security risk in shared environments.

---

## 🎯 Severity & Priority

- **Severity:** HIGH (Security vulnerability)
- **Priority:** URGENT (Compliance risk for financial application)
- **Impact:** 100% of users (session management affects everyone)

---

## 🧭 Environment

* **OS:** Windows 10, macOS Monterey, Ubuntu 22.04
* **Browser:** Chrome 122, Firefox 124, Edge 122
* **App Version:** v5.1.0-staging
* **Build Number:** #7892
* **Session Timeout Config:** 30 minutes (backend setting)

---

## 🧷 Preconditions

* User must login successfully
* Session timeout configured to **30 minutes** in backend config
* User must leave browser tab open (idle, no activity)
* User must not explicitly logout

---

## 🔄 Reproduction Steps

1. Login as standard user (`qa_user@company.com`)
2. Navigate to Dashboard
3. Note the current time: **2:00 PM**
4. Leave browser tab open (do not interact with the app)
5. Wait for **45 minutes** (past the 30-minute timeout)
6. Return to browser at **2:45 PM**
7. Click any navigation link (e.g., "My Profile")

---

## ❌ Actual Result

- User is **still logged in** after 45 minutes
- Dashboard loads normally
- No session expiration warning displayed
- API requests still succeed with existing auth token

---

## ✅ Expected Result

- After 30 minutes of inactivity, user should be **automatically logged out**
- Clicking any link should redirect to login page
- Error message: *"Your session has expired. Please login again."*
- Auth token should be invalidated on backend

---

## 🔍 Root Cause Analysis

Worked with backend team and found the issue in JWT token expiration logic:

```javascript
// ❌ Incorrect Implementation (Backend v5.1.0)
// Token expiration set at LOGIN time, not updated on activity
const token = jwt.sign(
  { userId: user.id },
  SECRET_KEY,
  { expiresIn: '24h' }  // ← Token lasts 24 hours, not 30 minutes
);

// Session timeout check was only on CLIENT side (easily bypassed)
if (lastActivity + 30min < now) {
  // Redirect to login (but token still valid!)
}
```

**Issue:**
- JWT token expires in **24 hours** (hardcoded)
- Client-side timeout check at 30 minutes was **never enforced on backend**
- Users could bypass client check by directly hitting API endpoints

**Fix:**
```javascript
// ✅ Correct Implementation (v5.1.1)
const token = jwt.sign(
  { userId: user.id },
  SECRET_KEY,
  { expiresIn: '30m' }  // ← Token expires in 30 minutes
);

// Added middleware to check token expiration on EVERY request
app.use((req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Session expired' });
    next();
  });
});
```

---

## 📊 Impact Assessment

- **Security Risk:** Shared computer environments (libraries, offices) left logged-in sessions exposed
- **Compliance Issue:** Violates SOC 2 requirement for automatic session termination
- **User Risk:** Unauthorized access if user forgets to logout
- **Audit Finding:** Security team flagged this during quarterly review

---

## 🛠️ Fix & Verification

**Resolution:**
- Backend team aligned JWT `expiresIn` to match configured timeout (30 minutes)
- Added server-side token expiration validation middleware
- Removed reliance on client-side timeout checks
- Deployed hotfix to staging → production: Build #7921 (v5.1.1)

**Verification Steps (Post-Fix):**
1. Login → Wait 31 minutes → Try API call → **401 Unauthorized** ✅
2. Login → Wait 29 minutes → Make request → **Success** ✅
3. Login → Wait 15 min → Click link → Wait 16 min → Click again → **Session expired redirect** ✅
4. Tested across Chrome, Firefox, Edge → All enforce timeout correctly ✅

**Regression Tests Added:**
- Automated Playwright test: `session-timeout-enforcement.spec.ts`
- API test: `POST /api/profile` after 31 minutes → Expect 401

---

## 📎 Evidence

*Note: Actual videos, console logs, and screenshots are confidential and cannot be shared. This bug report demonstrates my approach to security testing and collaboration with backend engineers.*

---

## 🎓 Lessons Learned

- **Never trust client-side security** (client checks can be bypassed easily)
- **JWT expiration must match business requirements** (24h default is NOT always correct)
- **Test non-functional requirements** (security, performance, not just features)
- **Idle timeout is different from absolute timeout** (we now have both configured)
- **Automated security tests are critical** (manual testing missed this for 2 releases)

---

## 🔗 Related Issues

- **BUG-AUTH-049:** "Remember Me" checkbox ignores session timeout (fixed in same release)
- **FEATURE-AUTH-120:** Add session timeout warning modal (5 min before expiry)

---

## 🏷️ Tags

`#security` `#authentication` `#session-management` `#jwt` `#high-severity` `#compliance-risk` `#staging-bug`
