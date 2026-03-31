const DOCUMENTS = {
  'offer-letter': {
    title: 'Offer Letter',
    subtitle: 'The TGM Group LLC',
    date: 'May 1, 2025',
    employerName: 'Jovian Cabrera',
    employerTitle: 'Founder & Owner, The TGM Group LLC',
    employeeName: 'Trinity Cabrera',
    employeeTitle: 'Field Technician',
    html: `
      <p style="text-align:center;"><strong style="font-size:18px;">THE TGM GROUP LLC</strong><br>
      <span style="color:#666;">tgmwashers@thetgmgroup.com | tgmwashers.com | Texas, USA</span></p>
      <p style="text-align:right;">May 1, 2025</p>
      <p><strong>Trinity Cabrera</strong><br>Texas, USA</p>
      <p><strong>Dear Trinity,</strong></p>
      <p>On behalf of The TGM Group LLC, it is my pleasure to formally offer you the position of <strong>Field Technician</strong>. Your dedication and hard work since the early days of this company have not gone unnoticed, and this offer reflects the value you bring to our operation.</p>
      <p>Please review this letter and the accompanying Employment Agreement carefully. This offer is contingent upon completion of all pre-hire requirements by <strong>April 15, 2025</strong>. Acceptance of this offer constitutes your agreement to all terms outlined herein and in the Employment Agreement.</p>

      <h2>Position Details</h2>
      <p><strong>Job Title:</strong> Field Technician<br>
      <strong>Employment:</strong> Full-Time<br>
      <strong>Start Date:</strong> May 1, 2025<br>
      <strong>Reports To:</strong> Jovian Cabrera, Founder &amp; Owner</p>

      <h2>Compensation</h2>
      <p>Starting Salary: <strong>$2,500 per month</strong> ($30,000 annually), paid on a weekly basis.</p>
      <p><strong>Performance-Based Raises tied to company growth milestones:</strong></p>
      <ul>
        <li>$3,000/month upon reaching 50 active rental sets under management</li>
        <li>$3,500/month upon reaching 100 active rental sets under management</li>
      </ul>

      <h2>Benefits</h2>
      <ul>
        <li>Company vehicle provided for all work-related travel</li>
        <li>Company phone provided for operational and customer communications</li>
        <li>Paid Time Off: 2 weeks (10 business days) granted upfront upon start date</li>
        <li>Ongoing training and access to TGM Operations Platform (TOP)</li>
      </ul>

      <h2>Primary Responsibilities</h2>
      <p>As Field Technician, your core responsibilities include:</p>
      <ul>
        <li>Delivery, installation, setup, and removal of washer and dryer rental units</li>
        <li>Routine maintenance checks and basic troubleshooting of equipment</li>
        <li>Customer communication and on-site support</li>
        <li>Coordination with operations management for scheduling and logistics</li>
        <li>Proper handling and care of all company vehicles and equipment</li>
        <li>Verification and documentation of customer identification at the time of install, logged into the TGM Operations Platform (TOP)</li>
      </ul>

      <h2>Additional Responsibilities</h2>

      <h3>Equipment Training</h3>
      <ul>
        <li>Develop working knowledge of washer and dryer unit types in the TGM inventory</li>
        <li>Learn and practice disassembly, reassembly, and diagnostic procedures</li>
        <li>Utilize training resources provided by The TGM Group LLC and apply knowledge in the field</li>
      </ul>

      <h3>Advertising &amp; Community Outreach</h3>
      <ul>
        <li>Distribute door hangers at targeted apartment communities and neighborhoods</li>
        <li>Place postcards and flyers at laundromats (at car doors and common areas)</li>
        <li>Post and manage listings on Facebook Marketplace as directed</li>
        <li>Represent TGM professionally to generate referrals from existing customers</li>
        <li>Display company branding on work vehicle magnets during field operations</li>
      </ul>

      <h3>Dashboard Management</h3>
      <ul>
        <li>Log all completed jobs, installs, and maintenance visits in the TGM Operations Platform (TOP) via tgm.llc</li>
        <li>Monitor and report any dashboard errors, relay issues, or system anomalies to management</li>
        <li>Submit feedback and feature requests to improve operational workflows</li>
      </ul>

      <h2>Solo Operations &amp; Schedule</h2>
      <p>This role regularly requires independent field work. The Field Technician must be capable of performing solo installs and maintenance calls, primarily for first-floor units and single-person-manageable jobs. Situations requiring physical assistance beyond solo capacity will be evaluated on a case-by-case basis.</p>
      <p>This position is on-call in nature. The Field Technician may be needed any day based on customer demand and operational urgency. Scheduling will be coordinated with flexibility around the employee's availability. Sunday availability is not required except in the case of a declared operational emergency.</p>

      <h2>Pre-Hire Requirements (Due April 15, 2025)</h2>
      <p>This offer is contingent upon receipt of all of the following items by April 15, 2025:</p>
      <ul>
        <li>Written confirmation of two-week notice submitted to current employer</li>
        <li>Two most recent pay stubs from current employer</li>
        <li>Completed W-4 (Employee's Withholding Certificate) for Gusto payroll enrollment</li>
      </ul>
      <p>Failure to submit all required items by April 15, 2025 may result in withdrawal of this offer.</p>

      <h2>Next Steps</h2>
      <p>Please review this offer along with the accompanying Employment Agreement. Sign and return both documents by April 15, 2025, along with all pre-hire items listed above. If you have any questions, do not hesitate to reach out directly.</p>
      <p>We are proud to formally welcome you to The TGM Group LLC team. Your role is essential to the growth of this company, and we look forward to building something great together.</p>
      <p>Sincerely,</p>
    `
  },

  'employment-agreement': {
    title: 'Employment Agreement',
    subtitle: 'The TGM Group LLC',
    date: 'May 1, 2025',
    employerName: 'Jovian Cabrera',
    employerTitle: 'Founder & Owner, The TGM Group LLC',
    employeeName: 'Trinity Cabrera',
    employeeTitle: 'Field Technician',
    html: `
      <p style="text-align:center;"><strong style="font-size:18px;">THE TGM GROUP LLC</strong><br>
      <span style="color:#666;">tgmwashers@thetgmgroup.com | tgmwashers.com | Texas, USA</span></p>
      <p style="text-align:center; font-size:16px; margin:1rem 0;"><strong>EMPLOYMENT AGREEMENT</strong></p>
      <p>This Employment Agreement ("Agreement") is entered into as of <strong>May 1, 2025</strong>, by and between:</p>
      <p><strong>Employer:</strong> The TGM Group LLC, a Texas Limited Liability Company<br>
      <strong>Employee:</strong> Trinity Cabrera</p>
      <p>Collectively referred to herein as the "Parties."</p>

      <h2>1. Position and Duties</h2>
      <p>Employee is hired as a full-time <strong>Field Technician</strong>. Employee agrees to perform all duties assigned by the Employer, including but not limited to:</p>

      <h3>Primary Field Duties</h3>
      <ul>
        <li>Delivery, installation, setup, and removal of washer and dryer rental units</li>
        <li>Routine equipment maintenance and basic troubleshooting</li>
        <li>Customer communication and on-site support</li>
        <li>Scheduling coordination and logistics management</li>
        <li>Proper operation and care of company vehicles and equipment</li>
        <li>Verification and documentation of customer identification at the time of install, recorded in the TGM Operations Platform (TOP)</li>
        <li>Any additional duties as reasonably assigned by Employer</li>
      </ul>

      <h3>Equipment Training</h3>
      <ul>
        <li>Develop working knowledge of washer and dryer units in TGM inventory, including disassembly, reassembly, and diagnostics</li>
        <li>Utilize training resources provided by The TGM Group LLC to build and maintain technical proficiency</li>
      </ul>

      <h3>Advertising &amp; Community Outreach</h3>
      <ul>
        <li>Distribute door hangers at targeted apartment communities and neighborhoods</li>
        <li>Place postcards and flyers at laundromats (at car doors and common areas)</li>
        <li>Post and manage listings on Facebook Marketplace as directed</li>
        <li>Generate customer referrals through professional representation in the field</li>
        <li>Display company branding magnets on work vehicle during field operations</li>
      </ul>

      <h3>Dashboard Management</h3>
      <ul>
        <li>Log all completed jobs, installs, and maintenance visits into TOP (tgm.llc) following each service call</li>
        <li>Monitor and report system errors, relay issues, or operational anomalies to management promptly</li>
        <li>Submit structured feedback and improvement requests through designated channels</li>
      </ul>

      <h2>2. Solo Operations &amp; On-Call Availability</h2>
      <p>Employee acknowledges that field operations regularly require independent, solo work. Employee agrees to be capable of performing installs and maintenance calls independently for first-floor units and any job reasonably manageable by a single technician. Situations exceeding solo capacity will be coordinated with Employer in advance.</p>
      <p>This position is on-call in nature. Employee may be required to respond to service calls on any day of the week based on customer need and operational urgency. Scheduling will be coordinated with reasonable flexibility around Employee's availability. Employee is not required to be available on Sundays except in circumstances declared an operational emergency by Employer.</p>

      <h2>3. TGM Operations Platform (TOP)</h2>
      <p>Employee agrees to actively use the TGM Operations Platform (TOP), accessible at tgm.llc, as the primary system for logging job activity, managing customer records, and coordinating field operations. Use of TOP is a condition of employment. Employee agrees to report any system issues or usability concerns to management and to participate in platform improvements as requested.</p>

      <h2>4. Compensation</h2>
      <p>Employee will receive a starting monthly salary of <strong>$2,500</strong> ($30,000 annually), paid on a weekly basis. Compensation is subject to adjustment based on the following milestones:</p>
      <ul>
        <li>$3,000/month upon the company reaching 50 active rental sets under management</li>
        <li>$3,500/month upon the company reaching 100 active rental sets under management</li>
      </ul>
      <p>All compensation is subject to applicable federal and state tax withholdings.</p>

      <h2>5. Benefits</h2>
      <ul>
        <li>Company vehicle provided for all work-related use. Personal use must be approved by Employer in advance.</li>
        <li>Company phone provided for operational and customer communications. Device remains property of The TGM Group LLC.</li>
        <li>Paid Time Off: Employee is granted 10 business days (2 weeks) of PTO upfront upon commencement of employment. PTO resets annually on the employment anniversary date.</li>
        <li>Training resources provided by Employer to support technical proficiency and professional development.</li>
      </ul>

      <h2>6. At-Will Employment</h2>
      <p>Employment with The TGM Group LLC is at-will. Either party may terminate this Agreement at any time, with or without cause, and with or without notice, subject to applicable Texas law. Nothing in this Agreement shall be construed as a guarantee of continued employment.</p>

      <h2>7. Confidentiality</h2>
      <p>Employee acknowledges that during the course of employment, Employee will have access to confidential and proprietary information belonging to The TGM Group LLC, including but not limited to:</p>
      <ul>
        <li>Customer lists, contact information, and account details</li>
        <li>Pricing structures, business strategies, and financial information</li>
        <li>The TGM Operations Platform (TOP) and all related systems, code, workflows, and integrations</li>
        <li>Operational processes, vendor relationships, and trade practices</li>
      </ul>
      <p>Employee agrees to hold all such information in strict confidence during and after employment, and shall not disclose, use, or transfer any confidential information without prior written consent from Employer.</p>

      <h2>8. Non-Compete &amp; Non-Solicitation</h2>
      <p>During employment and for a period of twelve (12) months following the termination of employment, Employee agrees not to:</p>
      <ul>
        <li>Directly or indirectly engage in a washer and dryer rental business within the Houston metropolitan area (Harris County and contiguous counties: Fort Bend, Brazoria, Galveston, Chambers, Liberty, Montgomery, and Waller)</li>
        <li>Solicit any customers of The TGM Group LLC for a competing business</li>
        <li>Solicit or recruit any employees or contractors of The TGM Group LLC</li>
      </ul>
      <p>The Parties acknowledge that this restriction is reasonable in scope, duration, and geography given the nature of the business and Employee's access to confidential information and customer relationships.</p>

      <h2>9. Company Property</h2>
      <p>All equipment, tools, devices, vehicles, systems, and materials provided by The TGM Group LLC remain the sole property of the Company. Upon termination of employment, Employee agrees to return all company property immediately and in good condition.</p>

      <h2>10. Governing Law</h2>
      <p>This Agreement shall be governed by and construed in accordance with the laws of the State of Texas. Any disputes arising under this Agreement shall be resolved in the appropriate courts of Texas.</p>

      <h2>11. Entire Agreement</h2>
      <p>This Agreement constitutes the entire agreement between the Parties with respect to the subject matter herein and supersedes all prior discussions, representations, or agreements. This Agreement may only be modified in writing signed by both Parties.</p>

      <p style="margin-top:2rem;"><strong>IN WITNESS WHEREOF,</strong> the Parties have executed this Agreement as of the date first written above.</p>
    `
  },

  'prehire-checklist': {
    title: 'Pre-Hire Requirements Checklist',
    subtitle: 'The TGM Group LLC',
    date: 'May 1, 2025',
    employerName: 'Jovian Cabrera',
    employerTitle: 'Founder & Owner, The TGM Group LLC',
    employeeName: 'Trinity Cabrera',
    employeeTitle: 'Field Technician',
    html: `
      <p style="text-align:center;"><strong style="font-size:18px;">THE TGM GROUP LLC</strong><br>
      <span style="color:#666;">tgmwashers@thetgmgroup.com | tgmwashers.com | Texas, USA</span></p>
      <p style="text-align:center; font-size:16px; margin:1rem 0;"><strong>PRE-HIRE REQUIREMENTS CHECKLIST</strong></p>
      <p><strong>Candidate:</strong> Trinity Cabrera<br>
      <strong>Position:</strong> Field Technician | <strong>Start Date:</strong> May 1, 2025</p>
      <p style="background:#fff3e0; padding:10px 14px; border-radius:6px; border-left:4px solid #f5a623; font-size:13px;">
        <strong>All items must be submitted to Jovian Cabrera by April 15, 2025.</strong> Failure to submit may result in withdrawal of the offer.
      </p>

      <div class="section-header">Section 1 &mdash; Offer Acceptance</div>
      <table class="doc-table">
        <tr><th style="width:60px;">Done</th><th>Requirement</th><th>Details / Notes</th></tr>
        <tr><td style="text-align:center;">&#9744;</td><td><strong>Signed Offer Letter</strong></td><td>Original signed offer letter returned to Jovian</td></tr>
        <tr><td style="text-align:center;">&#9744;</td><td><strong>Signed Employment Agreement</strong></td><td>Original signed employment agreement returned to Jovian</td></tr>
      </table>

      <div class="section-header">Section 2 &mdash; Current Employment</div>
      <table class="doc-table">
        <tr><th style="width:60px;">Done</th><th>Requirement</th><th>Details / Notes</th></tr>
        <tr class="upload-row" data-upload-id="two-week-notice">
          <td style="text-align:center;"><span class="check-icon">&#9744;</span></td>
          <td><strong>Two-Week Notice Confirmation</strong></td>
          <td>Written confirmation that notice has been submitted to current employer
            <div class="checklist-upload">
              <label class="checklist-upload-btn"><input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" hidden>Upload File</label>
              <span class="checklist-upload-info"></span>
            </div>
          </td>
        </tr>
        <tr class="upload-row" data-upload-id="pay-stubs">
          <td style="text-align:center;"><span class="check-icon">&#9744;</span></td>
          <td><strong>Two Most Recent Pay Stubs</strong></td>
          <td>Stubs from current/most recent employer &mdash; used for income verification
            <div class="checklist-upload">
              <label class="checklist-upload-btn"><input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" multiple hidden>Upload Files</label>
              <span class="checklist-upload-info"></span>
            </div>
          </td>
        </tr>
      </table>

      <div class="section-header">Section 3 &mdash; Payroll Setup (Gusto)</div>
      <table class="doc-table">
        <tr><th style="width:60px;">Done</th><th>Requirement</th><th>Details / Notes</th></tr>
        <tr class="upload-row" data-upload-id="w4">
          <td style="text-align:center;"><span class="check-icon">&#9744;</span></td>
          <td><strong>Completed W-4</strong></td>
          <td>Federal Employee's Withholding Certificate &mdash; required for Gusto enrollment
            <div class="checklist-upload">
              <label class="checklist-upload-btn"><input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" hidden>Upload File</label>
              <span class="checklist-upload-info"></span>
            </div>
          </td>
        </tr>
        <tr class="upload-row" data-upload-id="direct-deposit">
          <td style="text-align:center;"><span class="check-icon">&#9744;</span></td>
          <td><strong>Direct Deposit Info (if applicable)</strong></td>
          <td>Routing and account number for payroll setup (optional but preferred)
            <div class="checklist-upload">
              <label class="checklist-upload-btn"><input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" hidden>Upload File</label>
              <span class="checklist-upload-info"></span>
            </div>
          </td>
        </tr>
        <tr class="upload-row" data-upload-id="i9-docs">
          <td style="text-align:center;"><span class="check-icon">&#9744;</span></td>
          <td><strong>I-9 Supporting Documents</strong></td>
          <td>Government-issued photo ID + eligibility document (e.g., driver's license + SS card or passport)
            <div class="checklist-upload">
              <label class="checklist-upload-btn"><input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" multiple hidden>Upload Files</label>
              <span class="checklist-upload-info"></span>
            </div>
          </td>
        </tr>
      </table>

      <div class="section-header">Section 4 &mdash; Operational Readiness</div>
      <table class="doc-table">
        <tr><th style="width:60px;">Done</th><th>Requirement</th><th>Details / Notes</th></tr>
        <tr><td style="text-align:center;">&#9744;</td><td><strong>TOP Account Setup</strong></td><td>Employee has logged into tgm.llc and confirmed access</td></tr>
        <tr><td style="text-align:center;">&#9744;</td><td><strong>Company Phone Received</strong></td><td>Device issued and tested for operational use</td></tr>
        <tr><td style="text-align:center;">&#9744;</td><td><strong>Company Vehicle Orientation</strong></td><td>Walk-through completed on vehicle use, care, and expectations</td></tr>
      </table>
    `
  }
};
