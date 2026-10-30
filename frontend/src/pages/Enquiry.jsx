import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import '../styles/forms.css';

export default function Enquiry() {
  const { isTamil } = useLanguage();
  const [searchParams] = useSearchParams();
  const prefilledEvent = searchParams.get('event') || '';
  const prefilledService = searchParams.get('service') || '';

  const initialFormData = {
    customerName: '',
    phone: '',
    email: '',
    eventType: prefilledService || prefilledEvent ? 'Cultural Festival' : '',
    selectedEvent: prefilledEvent || '',
    eventDate: '',
    venue: '',
    performanceCount: '1 Performance (Full Ensemble)',
    message: prefilledEvent
      ? `I would like to enquire about tickets/booking for the event: ${prefilledEvent}.`
      : prefilledService
      ? `I am interested in booking the troupe for: ${prefilledService}.`
      : ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (prefilledEvent) {
      setFormData((prev) => ({
        ...prev,
        selectedEvent: prefilledEvent,
        message: `I would like to enquire about: ${prefilledEvent}.`
      }));
    } else if (prefilledService) {
      setFormData((prev) => ({
        ...prev,
        eventType: prefilledService,
        message: `I am interested in booking the troupe for: ${prefilledService}.`
      }));
    }
  }, [prefilledEvent, prefilledService]);

  const validate = () => {
    const errs = {};

    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer Name is required.';
    } else if (formData.customerName.trim().length < 3) {
      errs.customerName = 'Name must be at least 3 characters.';
    }

    const phoneClean = formData.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (phoneClean.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!formData.eventType) {
      errs.eventType = 'Please select an event type.';
    }

    if (!formData.eventDate) {
      errs.eventDate = 'Please select a preferred event date.';
    }

    if (!formData.venue.trim()) {
      errs.venue = 'Event venue or city location is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.submitEnquiry(formData);
      if (res.success) {
        setIsSuccess(true);
        setReferenceId(res.referenceId || res.data?.referenceId || 'KALAI-CONFIRMED');
        window.scrollTo({ top: 300, behavior: 'smooth' });
      } else {
        setServerError(res.message || 'Failed to submit enquiry to server.');
      }
    } catch (err) {
      setServerError('Unable to connect to the backend server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsSuccess(false);
    setReferenceId('');
    setServerError(null);
  };

  return (
    <div className="enquiry-page">
      {/* Header Banner */}
      <section className="events-header-bg">
        <div className="container">
          <SectionTitle
            dark={true}
            badge="Troupe Booking & Consultation"
            tamilBadge="கலைக்குழு முன்பதிவு"
            title="Cultural Performance Enquiry"
            tamilTitle="கலைமன்ற முன்பதிவு படிவம்"
            desc="Invite our distinguished Bharatanatyam exponents, Carnatic vidwans, and folk troupes for your sacred celebrations."
            tamilDesc="உங்கள் இல்ல சுபநிகழ்ச்சிகள் மற்றும் கோவில் விழாக்களுக்கு பரதநாட்டியம், கர்நாடக சங்கீதம் மற்றும் கிராமிய கலைக்குழுக்களை அழைக்க முன்பதிவு செய்யுங்கள்."
          />
        </div>
      </section>

      {/* Main Form Section */}
      <section className="section" style={{ background: 'var(--cream-bg)', paddingTop: '20px' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          {isSuccess ? (
            /* Success State Connected to Real Backend */
            <div className="enquiry-success-card">
              <div className="success-icon-badge">
                <CheckCircle2 size={44} />
              </div>

              <div style={{ fontFamily: 'var(--font-tamil)', color: 'var(--maroon-primary)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                {isTamil ? 'மிக்க நன்றி! உங்கள் முன்பதிவு வினவல் வெற்றிகரமாக பெறப்பட்டது' : 'Thank You! We Have Received Your Request'}
              </div>

              <h2 style={{ fontSize: '1.9rem', color: 'var(--maroon-darkest)', marginBottom: '14px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                {isTamil ? 'முன்பதிவு வெற்றிகரமாக பதிவு செய்யப்பட்டது!' : 'Enquiry Successfully Registered!'}
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', maxWidth: '600px', margin: '0 auto 16px', lineHeight: 1.6 }}>
                {isTamil
                  ? <>அன்புள்ள <strong style={{ color: 'var(--maroon-darkest)' }}>{formData.customerName}</strong>, உங்கள் முன்பதிவு விவரங்கள் தரவுத்தளத்தில் பாதுகாப்பாக பதிவு செய்யப்பட்டுள்ளன. எங்கள் கலை ஒருங்கிணைப்பாளர் 24 மணி நேரத்திற்குள் உங்களைத் தொடர்புகொள்வார்.</>
                  : <>Dear <strong style={{ color: 'var(--maroon-darkest)' }}>{formData.customerName}</strong>, your enquiry has been securely saved in the database. Our cultural program coordinators have received your request and will reach out within 24 hours.</>}
              </p>

              {/* Reference ID Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(201, 154, 53, 0.15)',
                border: '1px solid var(--gold-primary)',
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--maroon-darkest)',
                margin: '12px 0 20px'
              }}>
                <span>{isTamil ? 'முன்பதிவு குறிப்பு எண்:' : 'Permanent Booking Reference:'}</span>
                <span style={{ color: 'var(--maroon-primary)', letterSpacing: '0.05em' }}>{referenceId}</span>
              </div>

              {/* Summary of submitted values */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid var(--cream-border)',
                padding: '24px',
                maxWidth: '620px',
                margin: '0 auto 24px',
                textAlign: 'left'
              }}>
                <h4 style={{ margin: '0 0 14px', color: 'var(--maroon-primary)', borderBottom: '1px solid var(--cream-border)', paddingBottom: '8px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                  {isTamil ? 'முன்பதிவு விவரங்களின் சுருக்கம்:' : 'Submitted Enquiry Summary:'}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem' }}>
                  <div><strong>Customer Name:</strong> {formData.customerName}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Event Type:</strong> {formData.eventType}</div>
                  <div><strong>Event Date:</strong> {formData.eventDate}</div>
                  <div><strong>Venue:</strong> {formData.venue}</div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <strong>Performances:</strong> {formData.performanceCount}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '20px' }}>
                <button onClick={handleReset} className="btn-gold">
                  <RotateCcw size={16} />
                  <span>Submit Another Enquiry</span>
                </button>

                <Link to="/events" className="btn-maroon-outline">
                  <span>Explore Other Events</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Interactive Enquiry Form */
            <div className="form-wrapper-card">
              <div style={{ marginBottom: '28px', borderBottom: '1px solid var(--cream-border)', paddingBottom: '20px' }}>
                <div style={{
                  fontFamily: 'var(--font-tamil)',
                  color: 'var(--gold-dark)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  marginBottom: '4px'
                }}>
                  கலை நிகழ்ச்சி முன்பதிவு & விவரக் கோரிக்கை
                </div>
                <h3 style={{ fontSize: '1.75rem', color: 'var(--maroon-darkest)', margin: 0 }}>
                  Cultural Troupe Booking Form
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px' }}>
                  Please fill out the details below. Our cultural curators will prepare a customized repertoire proposal and schedule.
                </p>
              </div>

              {serverError && (
                <div style={{
                  background: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  color: '#B91C1C',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '20px'
                }}>
                  <AlertCircle size={16} />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Row 1: Name and Phone */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customerName">
                      <span>Customer Name</span>
                      <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="e.g. S. Ramanathan / Dr. Ananya"
                      className={`form-input ${errors.customerName ? 'error' : ''}`}
                    />
                    {errors.customerName && (
                      <span className="form-error-msg">
                        <AlertCircle size={14} /> {errors.customerName}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      <span>Phone Number</span>
                      <span className="required-star">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && (
                      <span className="form-error-msg">
                        <AlertCircle size={14} /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Email and Event Type */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      <span>Email Address</span>
                      <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. yourname@example.com"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && (
                      <span className="form-error-msg">
                        <AlertCircle size={14} /> {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="eventType">
                      <span>Event Type / Occasion</span>
                      <span className="required-star">*</span>
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className={`form-select ${errors.eventType ? 'error' : ''}`}
                    >
                      <option value="">-- Select Occasion / Event Type --</option>
                      <option value="Traditional Wedding (Mangala Isai & Dance)">Traditional Wedding (Mangala Isai & Dance)</option>
                      <option value="Arangetram & Classical Recital">Arangetram & Classical Recital</option>
                      <option value="Temple Mahotsavam & Festival">Temple Mahotsavam & Festival</option>
                      <option value="Corporate Cultural Gala">Corporate Cultural Gala</option>
                      <option value="School / College Annual Day">School / College Annual Day</option>
                      <option value="Tamil Sangam / Diaspora Convention">Tamil Sangam / Diaspora Convention</option>
                      <option value="Therukoothu / Folk Carnival">Therukoothu / Folk Carnival</option>
                      <option value="Other Auspicious Function">Other Auspicious Function</option>
                    </select>
                    {errors.eventType && (
                      <span className="form-error-msg">
                        <AlertCircle size={14} /> {errors.eventType}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 3: Date and Venue */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="eventDate">
                      <span>Preferred Event Date</span>
                      <span className="required-star">*</span>
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className={`form-input ${errors.eventDate ? 'error' : ''}`}
                    />
                    {errors.eventDate && (
                      <span className="form-error-msg">
                        <AlertCircle size={14} /> {errors.eventDate}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="venue">
                      <span>Event Venue / City Location</span>
                      <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="e.g. Narada Gana Sabha, Chennai / Madurai Palace"
                      className={`form-input ${errors.venue ? 'error' : ''}`}
                    />
                    {errors.venue && (
                      <span className="form-error-msg">
                        <AlertCircle size={14} /> {errors.venue}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 4: Number of Performances */}
                <div className="form-group">
                  <label className="form-label" htmlFor="performanceCount">
                    <span>Number of Performances Required</span>
                  </label>
                  <select
                    id="performanceCount"
                    name="performanceCount"
                    value={formData.performanceCount}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="1 Performance (Full Ensemble)">1 Performance (Full Ensemble - 90 mins)</option>
                    <option value="2 Performances (E.g. Bharatanatyam + Carnatic Concert)">2 Performances (E.g. Bharatanatyam + Carnatic Concert)</option>
                    <option value="Half-Day Cultural Showcase (Multiple Troupes)">Half-Day Cultural Showcase (Multiple Troupes)</option>
                    <option value="Full-Day / Multi-Day Festival Package">Full-Day / Multi-Day Festival Package</option>
                    <option value="Custom Repertoire Requirement">Custom Repertoire Requirement</option>
                  </select>
                </div>

                {/* Row 5: Message */}
                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    <span>Additional Requirements / Special Notes</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Specify thematic desires (e.g. Silappadikaram theme, preferred ragas, stage dimensions, acoustic requirements)..."
                    className="form-textarea"
                  />
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--cream-border)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                    <ShieldCheck size={16} style={{ color: 'var(--gold-dark)' }} />
                    <span>Your request is logged directly in the administrative booking registry.</span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setFormData(initialFormData)}
                      className="btn-gold-outline"
                      style={{ padding: '12px 20px', fontSize: '0.88rem' }}
                    >
                      <span>Clear</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold"
                      style={{ padding: '13px 34px' }}
                      id="btn-submit-enquiry"
                    >
                      {isSubmitting ? (
                        <span>Submitting to Database...</span>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          <span>Submit Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
