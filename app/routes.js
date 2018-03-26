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
        req.session.data['penalty-or-fine'] = "Penalty"
        req.session.data['defendents-first-name'] = "Camilla "
        req.session.data['defendents-last-name'] = "JONES"
        req.session.data['defendents-age'] = "4 April 1970 (46 years old)"
        req.session.data['defendents-address-line-1'] = "6 Blessington Road"
        req.session.data['defendents-address-line-2'] = "Lewisham"
        req.session.data['defendents-town-or-city'] = "London"
        req.session.data['defendents-postcode'] = "SE13 5EB"       
        req.session.data['defendents-previous-convictions'] = "2"
        req.session.data['defendents-income'] = "£142.92 weekly (actual)"
        req.session.data['defendents-claiming-benefits'] = "No"
        req.session.data['defendents-employment-status'] = "Employed (full or part-time)"
        req.session.data['defendents-plea'] = "Pleaded guilty SJP"
        req.session.data['case-status'] = "Plea received - ready for decision"
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

    res.redirect('/legaladviser/add-or-change-income')
    
})
// ********************
// ADD OR CHANGE INCOME
router.post('/legaladviser/add-or-change-income', function (req, res) {

    res.redirect('/legaladviser/upload-documents')
    
})