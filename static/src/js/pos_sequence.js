odoo.define('pos_personalized_sequence.pos_sequence', function (require) {
"use strict";

    var core = require('web.core');
    var rpc = require('web.rpc');
    var screens = require('point_of_sale.screens');
    var models = require('point_of_sale.models');

    var QWeb = core.qweb;
    var _t = core._t;

    screens.PaymentScreenWidget.include({ 
        validate_order: function(force_validation) {
            var self = this;
            if (this.order_is_valid(force_validation)) {
                if (this.pos.config.personalized_sequence_id) {
                    rpc.query({
                        model: 'pos.order',
                        method: 'pos_personalized_sequence',
                        args: [
                            self.pos.get('selectedOrder'),
                            self.pos.config.personalized_sequence_id[0]
                        ]
                    }).then(function (data) {
                        var currentOrder = self.pos.get('selectedOrder');
                        currentOrder.setName(data);
                        self.finalize_validation();
                    })
                } else {
                    this.finalize_validation();
                }
            }
        },

    });

    models.Order = models.Order.extend({
        setName: function(name) {
            return this.name = name;
        },
    });
});