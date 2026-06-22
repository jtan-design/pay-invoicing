import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Invoice } from '../data/invoices'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n)

export const generatePDF = (invoice: Invoice) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()

  // Header bar
  doc.setFillColor(26, 86, 219)
  doc.rect(0, 0, W, 28, 'F')

  // pay logo text
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('pay', 14, 17)

  // Invoice label on right
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('INVOICE', W - 14, 12, { align: 'right' })
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(invoice.number, W - 14, 20, { align: 'right' })

  // From / To block
  doc.setTextColor(30, 41, 59)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('FROM', 14, 38)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(invoice.from.businessName, 14, 44)
  doc.setFontSize(8)
  doc.setTextColor(100, 116, 139)
  doc.text(`ABN ${invoice.from.abn}`, 14, 49)
  doc.text(invoice.from.email, 14, 54)

  doc.setTextColor(30, 41, 59)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('TO', W / 2, 38)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(invoice.to.businessName, W / 2, 44)
  doc.setFontSize(8)
  doc.setTextColor(100, 116, 139)
  doc.text(`ABN ${invoice.to.abn}`, W / 2, 49)
  doc.text(invoice.to.email, W / 2, 54)

  // Dates
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(100, 116, 139)
  doc.text('ISSUE DATE', W - 14, 38, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(30, 41, 59)
  doc.setFontSize(9)
  doc.text(invoice.issueDate, W - 14, 44, { align: 'right' })
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(100, 116, 139)
  doc.text('DUE DATE', W - 14, 50, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(30, 41, 59)
  doc.text(invoice.dueDate, W - 14, 56, { align: 'right' })

  // Divider
  doc.setDrawColor(226, 232, 240)
  doc.line(14, 60, W - 14, 60)

  // Line items table
  autoTable(doc, {
    startY: 65,
    head: [['Description', 'Qty', 'Rate', 'Amount']],
    body: invoice.lineItems.map(li => [
      li.description + (li.gst ? ' (+GST)' : ''),
      String(li.qty),
      fmt(li.rate),
      fmt(li.qty * li.rate),
    ]),
    styles: { fontSize: 9, cellPadding: 4, textColor: [30, 41, 59] },
    headStyles: { fillColor: [248, 250, 252], textColor: [100, 116, 139], fontStyle: 'bold', fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { halign: 'right', cellWidth: 16 },
      2: { halign: 'right', cellWidth: 28 },
      3: { halign: 'right', cellWidth: 32 },
    },
    margin: { left: 14, right: 14 },
    tableLineColor: [226, 232, 240],
    tableLineWidth: 0.2,
  })

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 6

  // Totals block
  const totals: [string, string][] = [
    ['Subtotal', fmt(invoice.subtotal)],
    ['GST (10%)', fmt(invoice.gst)],
    ['Total', fmt(invoice.total)],
  ]
  let y = finalY
  totals.forEach(([label, value], i) => {
    const isTotal = i === totals.length - 1
    if (isTotal) {
      doc.setDrawColor(226, 232, 240)
      doc.line(W - 80, y - 1, W - 14, y - 1)
      y += 2
    }
    doc.setFontSize(isTotal ? 11 : 9)
    doc.setFont('helvetica', isTotal ? 'bold' : 'normal')
    doc.setTextColor(isTotal ? 30 : 100, isTotal ? 41 : 116, isTotal ? 59 : 139)
    doc.text(label, W - 80, y)
    doc.setTextColor(30, 41, 59)
    doc.text(value, W - 14, y, { align: 'right' })
    y += isTotal ? 8 : 6
  })

  // Notes
  if (invoice.notes) {
    doc.setFillColor(248, 250, 252)
    doc.roundedRect(14, y + 4, W - 28, 14, 2, 2, 'F')
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 116, 139)
    doc.text(invoice.notes, 19, y + 12)
  }

  // Footer
  const pageH = doc.internal.pageSize.getHeight()
  doc.setFillColor(248, 250, 252)
  doc.rect(0, pageH - 14, W, 14, 'F')
  doc.setFontSize(7)
  doc.setTextColor(148, 163, 184)
  doc.text('Powered by pay.com.au', W / 2, pageH - 5, { align: 'center' })

  doc.save(`${invoice.number}.pdf`)
}
