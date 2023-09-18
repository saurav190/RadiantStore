
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const PDFGenerator = () => {
  const billingInfo = useSelector((state: RootState) => state.checkout);
  const cartItems = useSelector((state: RootState) => state.checkout.cartItem);
  // const cartItems = useSelector((state: RootState) => state.checkout.cartItem);
  const paymentInfo = useSelector((state: RootState) => state.checkout);

  // Extract subtotal, discount, and grand total from billingInfo
  const { subtotal, discount, grandTotal } = billingInfo;

  const generatePDF = () => {
    const doc = new jsPDF();

    // Define colors
    const primaryColor = '#1976D2';
    const tableBorderColor = '#CCCCCC';
    const tableHeaderColor = '#F5F5F5';

    // Set background color for header
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, 210, 20, 'F');

    // Add content to the PDF
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor('#FFFFFF');
    doc.text('Invoice', 10, 15);

    // Billing Information
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor('#000000');
    doc.text('Billing Information:', 10, 30);
    doc.text(`Name: ${billingInfo.billingFirstName} ${billingInfo.billingLastName}`, 10, 40);
    doc.text(`Email: ${billingInfo.billingEmail}`, 10, 50);
    doc.text(`Phone Number: ${billingInfo.billingPhoneNumber}`, 10, 60);
    doc.text(`Address Line 1: ${billingInfo.billingAddressLine1}`, 10, 70);
    doc.text(`Address Line 2: ${billingInfo.billingAddressLine2}`, 10, 80);
    doc.text(`City: ${billingInfo.billingCity}`, 10, 90);
    doc.text(`State: ${billingInfo.billingState}`, 10, 100);
    doc.text(`Postal Code: ${billingInfo.billingPostalCode}`, 10, 110);
    doc.text(`Country: ${billingInfo.billingCountry}`, 10, 120);

    // Payment Information
    doc.text('Payment Information:', 10, 140);
    doc.text(`Card Holder Name: ${paymentInfo.cardHolderName}`, 10, 150);
    doc.text(`Card Number: **** **** **** ${paymentInfo.cardNumber.slice(-4)}`, 10, 160);
    doc.text(`Expiration Date: ${paymentInfo.expirationDate}`, 10, 170);

    // Cart Items
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Cart Items:', 10, 190);

    // Define the columns for the table
    const columns = ['Product Name', 'Quantity', 'Total Price'];

    // Set initial y-coordinate for the table
    let y = 210;

    // Draw table header with background color and border
    doc.setFillColor(tableHeaderColor);
    doc.setDrawColor(tableBorderColor);
    doc.rect(10, y, 190, 10, 'FD');

    // Draw table headers with white text
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#000000');
    columns.forEach((column, index) => {
      doc.text(column, 15 + index * 60, y + 8);
    });

    // Draw cart items with border
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor('#000000');
    cartItems.forEach((item, index) => {
      y += 10;
      doc.setDrawColor(tableBorderColor);
      doc.rect(10, y, 190, 10);
      doc.text(item.title.length > 10 ? `${item.title.substring(0, 10)}...` : item.title, 15, y + 8);
      doc.text(item.quantity.toString(), 75, y + 8);
      doc.text(`$${item.totalPrice.toFixed(2)}`, 135, y + 8);
    });

    // Subtotal, Discount, and Grand Total
    y += 20; // Move down to create space for subtotal, discount, and grand total
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 135, y);
    doc.text(`Discount: $${discount.toFixed(2)}`, 135, y + 10);
    doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, 135, y + 20);

    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <div>
       <button className='bg-[#1976D2] text-white py-2 px-4 rounded right' onClick={generatePDF}>
        Generate PDF <FontAwesomeIcon icon={faFilePdf} style={{ marginLeft: '5px' }} />
      </button>
    </div>
  );
};

export default PDFGenerator;

