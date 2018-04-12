var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

module.exports = router

// *****
// INDEX
router.post('/', function (req, res) {
    
    var prosecutor = req.session.data['prosecutor-group']

    if (prosecutor == "DVLA (with back duty)") {
        req.session.data['case-reference-number'] = "9012466"
        req.session.data['penalty-or-fine'] = "Penalty"
        req.session.data['defendents-title'] = ""
        req.session.data['defendents-first-name'] = "Camilla"
        req.session.data['defendents-last-name'] = "Jones"
        req.session.data['defendents-age'] = "46"
        req.session.data['defendents-dob'] = "4 April 1970"
        req.session.data['defendents-dob-short'] = "4 Apr 1970"
        req.session.data['defendents-dob-day'] = "4"
        req.session.data['defendents-dob-month'] = "4"
        req.session.data['defendents-dob-year'] = "1970"
        req.session.data['defendents-address-line-1'] = "6 Blessington Road"
        req.session.data['defendents-address-line-2'] = "Lewisham"
        req.session.data['defendents-address-line-3'] = ""
        req.session.data['defendents-town-or-city'] = "London"
        req.session.data['defendents-postcode'] = "SE13 5EB"       
        req.session.data['defendents-home-telephone'] = ""
        req.session.data['defendents-mobile'] = "07975337198"
        req.session.data['defendents-email'] = "billy_s765@gmail.com"
        req.session.data['defendents-previous-convictions'] = "2"
        req.session.data['defendents-income'] = "£250 weekly (actual)"
        req.session.data['defendents-income-short'] = "250"
        req.session.data['defendents-income-amount'] = "1000"
        req.session.data['defendents-claiming-benefits'] = "Yes"
        req.session.data['benefits-details'] = ""
        req.session.data['defendents-employment-status'] = "Employed (full or part-time)"
        req.session.data['employment-status-group'] = "Employed (full or part-time)"
        req.session.data['defendents-plea'] = "No plea received"
        req.session.data['defendents-nin'] = "AB 12 34 56 C"
        req.session.data['case-status'] = "No plea received"
        req.session.data['prosecutor'] = "DVLA"
        req.session.data['notice-served'] = "30 April 2018"
        req.session.data['dates-to-avoid'] = "18 June 2018"
        req.session.data['offence-type'] = "Keep a vehicle without a vehicle license"
        req.session.data['offence-description'] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        req.session.data['statement-of-facts'] = "Eiusmod tempor orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        req.session.data['back-duty-description'] = "2 months unpaid duty"
        req.session.data['offence-banding-header'] = "Check penalty, back duty and compensation"
        req.session.data['guilty-plea-taken-into-account'] = "Yes"
        req.session.data['verdict'] = "Proved SJP"
        
        req.session.data['income-frequency-group'] = "Monthly"
        req.session.data['employee-number'] = "100192"
        req.session.data['employer-name'] = "Sainsbury's"
        req.session.data['employer-address-line-1'] = "Albert Road South"
        req.session.data['employer-address-line-2'] = ""
        req.session.data['employer-address-line-3'] = ""
        req.session.data['employer-town-or-city'] = "Watford"
        req.session.data['employer-postcode'] = "WD17 1PE"
        req.session.data['employer-telephone'] = "01923 255252"

        req.session.data['claiming-benefits-group'] = "No"
        req.session.data['benefits-details'] = ""
        
        
        
        
        //req.session.data['payment-method'] = "Pay directly to court"
        //req.session.data['deduct-from-benefits-reason'] = "No information from the defendant"
        //req.session.data['how-should-defendent-pay'] = "Lump sum amount"

        
        res.redirect('/legaladviser/dashboard')
        
    } else if (prosecutor == "DVLA (no back duty)") {
        req.session.data['penalty-or-fine'] = "Fine"
        req.session.data['defendents-first-name'] = "Billy"
        req.session.data['defendents-last-name'] = "SMITH"
        res.redirect('/legaladviser/dashboard')
    }

})

// **************
// DASHBOARD PAGE
router.post('/legaladviser/dashboard', function (req, res) {
                
    res.redirect('/legaladviser/search-for-a-case')
    
})

// *****************
// CASE DETAILS PAGE
router.post('/legaladviser/case-details-page', function (req, res) {
    
    req.session.data['decision'] = req.session.data['make-a-decision-group']
            
    res.redirect('/legaladviser/confirm-outcome')
    
})

// ***************
// CONFIRM OUTCOME
router.post('/legaladviser/confirm-outcome', function (req, res) {
    
    var fine = Number(req.session.data['penalty-or-fine-amount'])
    var backduty = Number(req.session.data['back-duty-amount'])
    var compensation = Number(req.session.data['compensation-amount'])
    var costs = Number(req.session.data['costs'])
    req.session.data['total-payment'] = fine+backduty+compensation+costs;
    
    
    
    var dischargeCompensation = Number(req.session.data['discharge-compensation'])
    var dischargeCosts = Number(req.session.data['discharge-costs'])
    var dischargeVictimSurcharge = Number(req.session.data['discharge-victim-surcharge'])
    req.session.data['total-payment-discharge'] = dischargeCompensation+dischargeCosts+dischargeVictimSurcharge;
    
    
    
    var decisionMade = req.session.data['make-a-decision-group']
    if (decisionMade == "Financial penalty") {
        res.redirect('/legaladviser/payment-method')
    }
    if (decisionMade == "Refer to court hearing") {
        res.redirect('/legaladviser/check-your-decision')
    }
    if (decisionMade == "Withdraw") {
        res.redirect('/legaladviser/check-your-decision')
    }
    if (decisionMade == "Discharge") {
        res.redirect('/legaladviser/payment-method')
    }
    
    /* DISMISS */
    if (decisionMade == "Dismiss") {
        var dismissCase = req.session.data['dismiss-this-offence-group']
        if (dismissCase == "Yes") {
            res.redirect('/legaladviser/check-your-decision')
        } else if (dismissCase == "No") {
            res.redirect('/legaladviser/case-details-page')
        }
    }
    
    

    
    
})

// **************
// PAYMENT METHOD
router.post('/legaladviser/payment-method', function (req, res) {
    
    var paymentMethod = req.session.data['payment-method-group']
        
    if (paymentMethod == "Pay direct to court") {
        res.redirect('/legaladviser/pay-direct-to-court')
    } else if (paymentMethod == "Deduct from benefits") {
        res.redirect('/legaladviser/deduct-from-benefits')
    }  else if (paymentMethod == "Attach to earnings") {
        res.redirect('/legaladviser/attach-to-earnings')
    } 
    
})

// *******************
// PAY DIRECT TO COURT
router.post('/legaladviser/pay-direct-to-court', function (req, res) {
    
    res.redirect('/legaladviser/check-your-decision')
    
})

// ********************
// DEDUCT FROM BENEFITS
router.post('/legaladviser/deduct-from-benefits', function (req, res) {
    
    res.redirect('/legaladviser/check-your-decision')
    
})

// ******************
// ATTACH TO EARNINGS
router.post('/legaladviser/attach-to-earnings', function (req, res) {
    
    res.redirect('/legaladviser/check-your-decision')
    
})

// ********************
// CHECK YOUR DECISIONS
router.post('/legaladviser/check-your-decision', function (req, res) {
 
    req.session.data['case-status'] = "Completed"
    req.session.data['defendents-plea'] = req.session.data['verdict']
    
    req.session.data['payment-terms'] = "to be paid as a lump sum in 28 days"

    res.redirect('/legaladviser/case-details-page')
    
})










// ******************************
// ADD OR CHANGE PERSONAL DETAILS
router.post('/legaladviser/add-or-change-personal-details', function (req, res) {
    
    
    req.session.data['defendents-title'] = req.session.data['new-title']
    req.session.data['defendents-first-name'] = req.session.data['new-first-name']
    req.session.data['defendents-last-name'] = req.session.data['new-last-name']
    req.session.data['defendents-home-telephone'] = req.session.data['new-home-telephone']
    req.session.data['defendents-dob-day'] = req.session.data['new-dob-day']
    req.session.data['defendents-dob-month'] = req.session.data['new-dob-month']
    req.session.data['defendents-dob-year'] = req.session.data['new-dob-year']
    
    req.session.data['defendents-address-line-1'] = req.session.data['new-address-line-1']
    req.session.data['defendents-address-line-2'] = req.session.data['new-address-line-2']
    req.session.data['defendents-town-or-city'] = req.session.data['new-town-or-city']
    req.session.data['defendents-county'] = req.session.data['new-county']
    req.session.data['defendents-postcode'] = req.session.data['new-postcode']
    
    req.session.data['defendents-email'] = req.session.data['new-email']
    req.session.data['defendents-home-telephone'] = req.session.data['new-home-telephone']
    req.session.data['defendents-mobile'] = req.session.data['new-mobile']
        
    req.session.data['warning-banner-switch'] = "on"
    
    res.redirect('/legaladviser/case-details-page')
    
})








// ********************
// ADD OR CHANGE INCOME
router.post('/legaladviser/add-or-change-income', function (req, res) {
    
    req.session.data['defendents-income-amount'] = req.session.data['new-defendents-income-amount']
    req.session.data['income-frequency-group'] = req.session.data['new-income-frequency-group']
    req.session.data['employment-status-group'] = req.session.data['new-employment-status-group']
    req.session.data['employee-number'] = req.session.data['new-employee-number']
    req.session.data['employer-name'] = req.session.data['new-employer-name']
    req.session.data['employer-address-line-1'] = req.session.data['new-employer-address-line-1']
    req.session.data['employer-address-line-2'] = req.session.data['new-employer-address-line-2']
    req.session.data['employer-address-line-3'] = req.session.data['new-employer-address-line-3']
    req.session.data['employer-town-or-city'] = req.session.data['new-employer-town-or-city']
    req.session.data['employer-postcode'] = req.session.data['new-employer-postcode']
    req.session.data['employer-telephone'] = req.session.data['new-employer-telephone']
    req.session.data['company-rep-title'] = req.session.data['new-company-rep-title']
    req.session.data['other-employment-details'] = req.session.data['new-other-employment-details']
    req.session.data['claiming-benefits-group'] = req.session.data['new-claiming-benefits-group']
    req.session.data['benefits-details'] = req.session.data['new-benefits-details']
    req.session.data['defendents-nin'] = req.session.data['new-defendents-nin']

    res.redirect('/legaladviser/case-details-page')
    
})






// ***********
// CHANGE PLEA
router.post('/legaladviser/change-plea', function (req, res) {
    
    req.session.data['defendents-plea'] = req.session.data['new-defendents-plea']

    res.redirect('/legaladviser/case-details-page')
    
})

