# -*- coding: utf-8 -*-

from odoo import fields, models

class PosConfig(models.Model):
    _inherit = 'pos.config'

    personalized_sequence_id = fields.Many2one('ir.sequence', 'Personalized Order IDs Sequence')
    refund_sequence_id = fields.Many2one('ir.sequence', 'Refund personalized Order IDs Sequence')
    resolucion_id = fields.Char('Resolucion POS')


class PosOrder(models.Model):
    _inherit = 'pos.order'

    def pos_personalized_sequence(self, sequence):
        sequence = self.env['ir.sequence'].sudo().browse([sequence])
        return sequence.next_by_id()


