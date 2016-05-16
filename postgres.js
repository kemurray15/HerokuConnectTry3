var pg = require('pg');    
var app = require('express');
var _ = ('underscore');


app.post('/getEligibleARPs', function (req, res) {
    var body = _.pick(req.body, 'memberID', 'memberSystem', 'country', 'membershipType', 'channel', 'serviceCode', 'currency');
    
    

    
    pg.connect(config.PGdatabaseURL, function (err, client, done) {
                    
        if (err) {
            res.status(500).send({ success: false, message: "Unable to connect to Postgres" }).end();
        } else {
            var sql = "select salesforce.arp_eligibility__c.arp__r.arp__code__c " +
            " from salesforce.Included_Product_Exception_Pricing__c,salesforce.ARP_Included_Products__c, salesforce.ARP__c, salesforce.ARP_to_Account_Xref__c " +
            " where currency__c = 'a11g0000004I4b4AAC' " +
            " and channel__c = 'a0zg00000019YrxAAE' " +
            " and service_office__c = 'a1Cg0000004bRUZEA2' " +
            " and salesforce.Included_Product_Exception_Pricing__c.included_product__c = salesforce.ARP_Included_Products__c.sfid " +
            " and productmaster__c= '" + req.params.ProductId + "' " +
            " and ARP_Included_Products__c.arp__c = ARP__c.sfid " +
            " and salesforce.ARP_to_Account_Xref__c.arp__c = ARP__c.sfid " +
            " and salesforce.ARP_to_Account_Xref__c.wdn_account__c = '" + req.params.WDNAccount + "' ";
        } 
                        
        client.query(sql, function (err, result) {
            done(); // 
            if (err) {
                res.status(500).send({ success: false, message: "Unable to inspect prices" }).end();
            } else {
                
                if (result.rowCount > 0) {
                    //                    res.status(200).send({ success: true, bestPrice : bestPriceData.bestPrice, bestPriceArp: bestPriceData.bestPriceArp }).end();
                    var leastVal, leastName;
                    leastVal = calculatePrice(result.rows[0], req.params.BasePrice);
                    leastName = result.rows[0].name;
                    for (var i = 1; i < result.rowCount; i++) {
                        var tempPrice = calculatePrice(result.rows[i], req.params.BasePrice);
                        if (tempPrice < leastVal) {                
                            leastVal = tempPrice;
                            leastName = result.rows[i].name;
                        }
                    }
                }
            }
        });
    });










    if (!_.isString(body.description) || 
        !_.isBoolean(body.completed) ||
        body.description.trim().length===0)

        {
        return res.status(400).send();
    }

    body.description = body.description.trim();

    body.id = todoNextId;
    todos.push(body);
    todoNextId++;
    res.json(body);
});


    