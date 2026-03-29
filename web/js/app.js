// ── Google Drive Configuration ──
// 1. Go to https://console.cloud.google.com
// 2. Create a project (or use existing)
// 3. Enable the "Google Drive API"
// 4. Create OAuth 2.0 credentials (Web application type)
//    - Add your GitHub Pages URL as an Authorized JavaScript origin
//      (e.g. https://nwdmm5x589-byte.github.io)
//    - Also add http://localhost:8090 for local testing
// 5. Copy the Client ID below
const GOOGLE_CONFIG = {
  clientId: '291173102063-hgn2ies556ji1jksh1mmojo6c44h886v.apps.googleusercontent.com',
  driveFolder: 'TGM Signed Documents',  // Folder name in Google Drive
};

// ── Initialize ──
let signaturePad = null;
let currentDoc = null;
let googleTokenClient = null;
let googleAccessToken = null;

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
  initGoogleAuth();
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

// ── Google Auth ──
function initGoogleAuth() {
  if (!GOOGLE_CONFIG.clientId) return;

  googleTokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CONFIG.clientId,
    scope: 'https://www.googleapis.com/auth/drive.file',
    callback: (response) => {
      if (response.access_token) {
        googleAccessToken = response.access_token;
      }
    },
  });
}

async function ensureGoogleAuth() {
  if (!GOOGLE_CONFIG.clientId) return false;

  return new Promise((resolve) => {
    if (googleAccessToken) {
      resolve(true);
      return;
    }

    googleTokenClient.callback = (response) => {
      if (response.access_token) {
        googleAccessToken = response.access_token;
        resolve(true);
      } else {
        resolve(false);
      }
    };

    googleTokenClient.requestAccessToken();
  });
}

// ── Google Drive Upload ──
async function getOrCreateFolder(folderName) {
  // Check if folder exists
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(folderName)}'+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&fields=files(id,name)`,
    { headers: { Authorization: `Bearer ${googleAccessToken}` } }
  );
  const searchData = await searchRes.json();

  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // Create folder
  const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    }),
  });
  const createData = await createRes.json();
  return createData.id;
}

async function uploadToDrive(pdfBlob, fileName) {
  const folderId = await getOrCreateFolder(GOOGLE_CONFIG.driveFolder);

  // Use multipart upload
  const metadata = {
    name: fileName,
    mimeType: 'application/pdf',
    parents: [folderId],
  };

  const formData = new FormData();
  formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  formData.append('file', pdfBlob);

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
    method: 'POST',
    headers: { Authorization: `Bearer ${googleAccessToken}` },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Drive upload failed: ${res.status}`);
  }

  return await res.json();
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
  btn.innerHTML = '<span class="spinner"></span> Generating & Saving...';

  try {
    const pdf = await generatePDF();
    const fileName = `${currentDoc.title.replace(/\s+/g, '_')}_Signed_${currentDoc.employeeName.replace(/\s+/g, '_')}.pdf`;

    // Try Google Drive if configured
    if (GOOGLE_CONFIG.clientId) {
      const authed = await ensureGoogleAuth();
      if (authed) {
        const pdfBlob = pdf.output('blob');
        const driveFile = await uploadToDrive(pdfBlob, fileName);

        // Mark as signed
        localStorage.setItem('tgm-signed-' + currentDoc.id, new Date().toISOString());

        // Show success
        document.getElementById('success-overlay').classList.add('show');
        document.getElementById('success-doc-name').textContent = currentDoc.title;

        const driveNote = document.getElementById('success-drive-note');
        if (driveFile.webViewLink) {
          driveNote.innerHTML = `Saved to Google Drive: <a href="${driveFile.webViewLink}" target="_blank" style="color:var(--green);">View file</a>`;
        } else {
          driveNote.textContent = `Saved to "${GOOGLE_CONFIG.driveFolder}" in Google Drive`;
        }
        return;
      }
    }

    // Fallback: download PDF locally
    pdf.save(fileName);

    localStorage.setItem('tgm-signed-' + currentDoc.id, new Date().toISOString());
    document.getElementById('success-overlay').classList.add('show');
    document.getElementById('success-doc-name').textContent = currentDoc.title;
    document.getElementById('success-drive-note').textContent =
      'The signed PDF has been downloaded. Upload it to Google Drive manually.';

  } catch (err) {
    console.error('Submit error:', err);
    alert('There was an error saving to Drive. The PDF will be downloaded instead.');
    try {
      const pdf = await generatePDF();
      const fileName = `${currentDoc.title.replace(/\s+/g, '_')}_Signed.pdf`;
      pdf.save(fileName);
    } catch (e) {
      alert('Error generating PDF: ' + e.message);
    }
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Sign &amp; Submit Document';
  }
}
