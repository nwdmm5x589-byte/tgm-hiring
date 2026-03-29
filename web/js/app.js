// ── Configuration ──
// To enable email sending, create a free EmailJS account at https://www.emailjs.com
// Then fill in these values:
const EMAILJS_CONFIG = {
  publicKey: '',      // Your EmailJS public key
  serviceId: '',      // Your EmailJS service ID (connect Gmail)
  templateId: '',     // Your EmailJS template ID
};

const TGM_EMAIL = 'tgmwashers@thetgmgroup.com';

// ── Initialize ──
let signaturePad = null;
let currentDoc = null;

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const docId = params.get('doc');

  if (!docId || !DOCUMENTS[docId]) {
    window.location.href = 'index.html';
    return;
  }

  currentDoc = { id: docId, ...DOCUMENTS[docId] };
  renderDocument();
  initSignaturePad();
  initDateFields();
});

function renderDocument() {
  document.getElementById('doc-title').textContent = currentDoc.title;
  document.getElementById('doc-meta').textContent = `The TGM Group LLC — ${currentDoc.date}`;
  document.getElementById('doc-content').innerHTML = currentDoc.html;
  document.getElementById('employer-name').textContent = currentDoc.employerName;
  document.getElementById('employer-title').textContent = currentDoc.employerTitle;
  document.getElementById('employee-name').textContent = currentDoc.employeeName;
  document.getElementById('employee-title').textContent = currentDoc.employeeTitle;
  document.getElementById('employer-sig-text').textContent = currentDoc.employerName;
  document.title = `Sign: ${currentDoc.title} — The TGM Group LLC`;
}

function initSignaturePad() {
  const canvas = document.getElementById('sig-canvas');
  const wrapper = canvas.parentElement;

  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = wrapper.offsetWidth * ratio;
    canvas.height = 120 * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
    if (signaturePad) signaturePad.clear();
  }

  signaturePad = new SignaturePad(canvas, {
    minWidth: 1,
    maxWidth: 2.5,
    penColor: '#0d2d4a'
  });

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Hide placeholder on first stroke
  signaturePad.addEventListener('beginStroke', () => {
    const ph = document.getElementById('sig-placeholder');
    if (ph) ph.style.display = 'none';
  });

  // Clear button
  document.getElementById('btn-clear-sig').addEventListener('click', () => {
    signaturePad.clear();
    const ph = document.getElementById('sig-placeholder');
    if (ph) ph.style.display = '';
  });
}

function initDateFields() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('employer-date').value = today;
  document.getElementById('employee-date').value = today;
}

// ── PDF Generation ──
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'letter');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentW = pageW - margin * 2;

  // Capture document content as image
  const docEl = document.getElementById('doc-content');
  const canvas = await html2canvas(docEl, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const imgW = contentW;
  const imgH = (canvas.height / canvas.width) * imgW;

  // Add document content (multi-page if needed)
  let yOffset = 0;
  const availableH = pageH - margin * 2;

  while (yOffset < imgH) {
    if (yOffset > 0) doc.addPage();

    // Crop section of the image for this page
    const sourceY = (yOffset / imgH) * canvas.height;
    const sourceH = Math.min((availableH / imgH) * canvas.height, canvas.height - sourceY);
    const destH = Math.min(availableH, imgH - yOffset);

    // Create a temporary canvas for this page slice
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = sourceH;
    const ctx = tempCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceH, 0, 0, canvas.width, sourceH);

    const sliceData = tempCanvas.toDataURL('image/jpeg', 0.95);
    doc.addImage(sliceData, 'JPEG', margin, margin, imgW, destH);
    yOffset += availableH;
  }

  // Add signature page
  doc.addPage();
  let y = margin;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Signatures', margin, y);
  y += 10;

  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 10;

  // Employer signature
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text('EMPLOYER', margin, y);
  y += 6;

  doc.setFontSize(20);
  doc.setTextColor(13, 45, 74);
  doc.setFont('courier', 'italic');
  doc.text(currentDoc.employerName, margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60);
  doc.text(currentDoc.employerTitle, margin, y);
  y += 5;
  doc.text('Date: ' + document.getElementById('employer-date').value, margin, y);
  y += 15;

  // Employee signature
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('EMPLOYEE', margin, y);
  y += 8;

  // Add drawn signature
  if (!signaturePad.isEmpty()) {
    const sigData = signaturePad.toDataURL('image/png');
    doc.addImage(sigData, 'PNG', margin, y, 60, 20);
    y += 22;
  }

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60);
  doc.text(currentDoc.employeeName, margin, y);
  y += 5;
  doc.text(currentDoc.employeeTitle, margin, y);
  y += 5;
  doc.text('Date: ' + document.getElementById('employee-date').value, margin, y);
  y += 15;

  // Footer line
  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('The TGM Group LLC | tgmwashers@thetgmgroup.com | tgmwashers.com', margin, y);
  y += 4;
  doc.text('Signed electronically via TGM Hiring Portal', margin, y);

  return doc;
}

// ── Submit Handler ──
async function handleSubmit() {
  if (signaturePad.isEmpty()) {
    alert('Please draw your signature before submitting.');
    return;
  }

  const btn = document.getElementById('btn-submit');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Generating & Sending...';

  try {
    const pdf = await generatePDF();
    const pdfBase64 = pdf.output('datauristring').split(',')[1];
    const fileName = `${currentDoc.title.replace(/\s+/g, '_')}_Signed_${currentDoc.employeeName.replace(/\s+/g, '_')}.pdf`;

    // Try EmailJS if configured
    if (EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId) {
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        to_email: TGM_EMAIL,
        from_name: currentDoc.employeeName,
        document_name: currentDoc.title,
        sign_date: document.getElementById('employee-date').value,
        pdf_attachment: pdfBase64,
        file_name: fileName,
      });
    } else {
      // If EmailJS not configured, download the PDF instead
      pdf.save(fileName);
    }

    // Mark as signed in localStorage
    localStorage.setItem('tgm-signed-' + currentDoc.id, new Date().toISOString());

    // Show success
    document.getElementById('success-overlay').classList.add('show');
    document.getElementById('success-doc-name').textContent = currentDoc.title;

    if (!EMAILJS_CONFIG.publicKey) {
      document.getElementById('success-email-note').textContent =
        'The signed PDF has been downloaded. Please email it to ' + TGM_EMAIL;
    }

  } catch (err) {
    console.error('Submit error:', err);
    alert('There was an error. The PDF has been downloaded instead. Please email it to ' + TGM_EMAIL);
    try {
      const pdf = await generatePDF();
      pdf.save(`${currentDoc.title.replace(/\s+/g, '_')}_Signed.pdf`);
    } catch (e) {
      alert('Error generating PDF: ' + e.message);
    }
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Sign &amp; Submit Document';
  }
}
