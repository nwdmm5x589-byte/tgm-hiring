// ── Apps Script Backend ──
// Signed PDFs are sent to this Google Apps Script which saves them
// to Google Drive and updates the Hiring tab in TGM_PROD.
// No login required for anyone — the script runs under the TGM account.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCLmsMqhcFf8dZPbVdIU_BGymf5ebFX4LviwuvIoP8ijOMZAYKel5I3O7Gxu49_DnQ2Q/exec';

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

  signaturePad.addEventListener('beginStroke', () => {
    const ph = document.getElementById('sig-placeholder');
    if (ph) ph.style.display = 'none';
  });

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

  const docEl = document.getElementById('doc-content');
  const canvas = await html2canvas(docEl, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  });

  const imgW = contentW;
  const imgH = (canvas.height / canvas.width) * imgW;

  let yOffset = 0;
  const availableH = pageH - margin * 2;

  while (yOffset < imgH) {
    if (yOffset > 0) doc.addPage();

    const sourceY = (yOffset / imgH) * canvas.height;
    const sourceH = Math.min((availableH / imgH) * canvas.height, canvas.height - sourceY);
    const destH = Math.min(availableH, imgH - yOffset);

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = sourceH;
    const ctx = tempCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceH, 0, 0, canvas.width, sourceH);

    const sliceData = tempCanvas.toDataURL('image/jpeg', 0.95);
    doc.addImage(sliceData, 'JPEG', margin, margin, imgW, destH);
    yOffset += availableH;
  }

  // Signature page
  doc.addPage();
  let y = margin;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Signatures', margin, y);
  y += 10;

  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 10;

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

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('EMPLOYEE', margin, y);
  y += 8;

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
  btn.innerHTML = '<span class="spinner"></span> Generating & Saving...';

  try {
    const pdf = await generatePDF();
    const fileName = `${currentDoc.title.replace(/\s+/g, '_')}_Signed_${currentDoc.employeeName.replace(/\s+/g, '_')}.pdf`;
    const pdfBase64 = pdf.output('datauristring').split(',')[1];

    // Send to Apps Script backend (no login needed)
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        pdfBase64: pdfBase64,
        fileName: fileName,
        documentName: currentDoc.title,
        employeeName: currentDoc.employeeName,
        signDate: document.getElementById('employee-date').value,
      }),
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('tgm-signed-' + currentDoc.id, new Date().toISOString());
      document.getElementById('success-overlay').classList.add('show');
      document.getElementById('success-doc-name').textContent = currentDoc.title;
      document.getElementById('success-drive-note').textContent =
        'Saved to The TGM Group Google Drive';
    } else {
      throw new Error(result.error || 'Upload failed');
    }

  } catch (err) {
    console.error('Submit error:', err);
    // Fallback: download PDF locally
    alert('There was an error saving to Drive. The PDF will be downloaded instead.');
    try {
      const pdf = await generatePDF();
      pdf.save(`${currentDoc.title.replace(/\s+/g, '_')}_Signed.pdf`);
      localStorage.setItem('tgm-signed-' + currentDoc.id, new Date().toISOString());
      document.getElementById('success-overlay').classList.add('show');
      document.getElementById('success-doc-name').textContent = currentDoc.title;
      document.getElementById('success-drive-note').textContent =
        'PDF downloaded. Please send to tgmwashers@thetgmgroup.com';
    } catch (e) {
      alert('Error generating PDF: ' + e.message);
    }
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Sign &amp; Submit Document';
  }
}
