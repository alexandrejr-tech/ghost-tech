import { useState, useEffect } from 'react'
import { funnelQuestions } from '../data/services'

const WHATSAPP_NUMBER = '5519981386574'

export default function ServiceFunnel({ isOpen, onClose, selectedService }) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    details: {}
  })

  const totalSteps = 4 // service, details, contact, summary

  useEffect(() => {
    if (isOpen) {
      setStep(0)
      setFormData({ name: '', company: '', phone: '', details: {} })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen || !selectedService) return null

  const questions = funnelQuestions.details[selectedService.id] || []

  const updateDetail = (id, value) => {
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [id]: value }
    }))
  }

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const buildWhatsAppMessage = () => {
    let msg = `*Novo Lead - Ghost Tech*\n\n`
    msg += `*Serviço:* ${selectedService.title}\n`
    msg += `*Faixa de investimento:* ${selectedService.price}\n\n`

    if (Object.keys(formData.details).length > 0) {
      msg += `*--- Detalhes ---*\n`
      questions.forEach(q => {
        const val = formData.details[q.id]
        if (val) msg += `*${q.label}:* ${val}\n`
      })
      msg += `\n`
    }

    msg += `*--- Contato ---*\n`
    msg += `*Nome:* ${formData.name}\n`
    if (formData.company) msg += `*Empresa:* ${formData.company}\n`
    msg += `*Telefone:* ${formData.phone}\n`

    return encodeURIComponent(msg)
  }

  const sendToWhatsApp = () => {
    const message = buildWhatsAppMessage()
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
    onClose()
  }

  const canProceed = () => {
    if (step === 2) {
      return formData.name.trim() && formData.phone.trim()
    }
    return true
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h3 className="funnel__step-title">Serviço selecionado</h3>
            <div className="funnel__summary">
              <div className="funnel__summary-item">
                <span className="funnel__summary-label">Serviço</span>
                <span className="funnel__summary-value">{selectedService.title}</span>
              </div>
              <div className="funnel__summary-item">
                <span className="funnel__summary-label">Descrição</span>
                <span className="funnel__summary-value">{selectedService.subtitle}</span>
              </div>
              <div className="funnel__summary-item">
                <span className="funnel__summary-label">Investimento</span>
                <span className="funnel__summary-value">{selectedService.price}</span>
              </div>
              <div className="funnel__summary-item">
                <span className="funnel__summary-label">Prazo estimado</span>
                <span className="funnel__summary-value">{selectedService.deadline}</span>
              </div>
            </div>
          </>
        )

      case 1:
        return (
          <>
            <h3 className="funnel__step-title">Detalhes do projeto</h3>
            {questions.map(q => (
              <div key={q.id} className="funnel__field">
                <label className="funnel__label">{q.label}</label>
                {q.type === 'select' ? (
                  <select
                    className="funnel__select"
                    value={formData.details[q.id] || ''}
                    onChange={(e) => updateDetail(q.id, e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {q.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : q.type === 'textarea' ? (
                  <textarea
                    className="funnel__textarea"
                    placeholder={q.placeholder}
                    value={formData.details[q.id] || ''}
                    onChange={(e) => updateDetail(q.id, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="funnel__input"
                    placeholder={q.placeholder}
                    value={formData.details[q.id] || ''}
                    onChange={(e) => updateDetail(q.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </>
        )

      case 2:
        return (
          <>
            <h3 className="funnel__step-title">Seus dados de contato</h3>
            <div className="funnel__field">
              <label className="funnel__label">Nome *</label>
              <input
                type="text"
                className="funnel__input"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                required
              />
            </div>
            <div className="funnel__field">
              <label className="funnel__label">Empresa</label>
              <input
                type="text"
                className="funnel__input"
                placeholder="Nome da empresa (opcional)"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
              />
            </div>
            <div className="funnel__field">
              <label className="funnel__label">Telefone / WhatsApp *</label>
              <input
                type="tel"
                className="funnel__input"
                placeholder="(19) 99999-9999"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                required
              />
            </div>
          </>
        )

      case 3:
        return (
          <>
            <h3 className="funnel__step-title">Resumo do pedido</h3>
            <div className="funnel__summary">
              <div className="funnel__summary-item">
                <span className="funnel__summary-label">Serviço</span>
                <span className="funnel__summary-value">{selectedService.title}</span>
              </div>
              <div className="funnel__summary-item">
                <span className="funnel__summary-label">Investimento</span>
                <span className="funnel__summary-value">{selectedService.price}</span>
              </div>
              {questions.map(q => {
                const val = formData.details[q.id]
                if (!val) return null
                return (
                  <div key={q.id} className="funnel__summary-item">
                    <span className="funnel__summary-label">{q.label}</span>
                    <span className="funnel__summary-value">{val}</span>
                  </div>
                )
              })}
              <div className="funnel__summary-item">
                <span className="funnel__summary-label">Nome</span>
                <span className="funnel__summary-value">{formData.name}</span>
              </div>
              {formData.company && (
                <div className="funnel__summary-item">
                  <span className="funnel__summary-label">Empresa</span>
                  <span className="funnel__summary-value">{formData.company}</span>
                </div>
              )}
              <div className="funnel__summary-item">
                <span className="funnel__summary-label">Telefone</span>
                <span className="funnel__summary-value">{formData.phone}</span>
              </div>
            </div>
            <button className="funnel__btn funnel__btn--whatsapp" onClick={sendToWhatsApp}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar via WhatsApp
            </button>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className={`funnel-overlay${isOpen ? ' active' : ''}`} onClick={(e) => {
      if (e.target === e.currentTarget) onClose()
    }}>
      <div className="funnel-modal">
        <div className="funnel__header">
          <h2 className="funnel__title">Solicitar Orçamento</h2>
          <button className="funnel__close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="funnel__steps">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`funnel__step${i === step ? ' active' : ''}${i < step ? ' completed' : ''}`}
            />
          ))}
        </div>

        <div className="funnel__body">
          {renderStep()}
        </div>

        {step < 3 && (
          <div className="funnel__footer">
            {step > 0 ? (
              <button className="funnel__btn funnel__btn--back" onClick={() => setStep(s => s - 1)}>
                Voltar
              </button>
            ) : (
              <div />
            )}
            <button
              className="funnel__btn funnel__btn--next"
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
            >
              {step === 2 ? 'Ver Resumo' : 'Próximo'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
