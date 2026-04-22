const { useState, useEffect, useRef, Fragment, createContext, useContext } = React;

// =========================================================================
// I18N
// =========================================================================

const STRINGS = {
  de: {
    // Sidebar
    nav_inquiries: "Anfragen",
    nav_monitor: "Markt-Monitor",
    nav_analytics: "Analytics",
    nav_archive: "Archiv",
    nav_settings: "ISQ7-Konfiguration",
    // Topbar
    back: "Zurück",
    today: "Heute",
    last_30_days: "Letzte 30 Tage",
    vienna_live: "Wien · Live",
    hotel_live: "The Lakeview Vienna",
    // Tags
    tag_new: "Neu",
    tag_priced: "Bepreist",
    tag_sent: "Gesendet",
    tag_vip: "VIP",
    // Inbox
    inbox_greeting: "Guten Morgen, Andreas",
    inbox_headline_tpl: "Du hast {n} offene Anfragen.",
    inbox_lede: "ISQ7 hat jede gelesen, klassifiziert und bepreist. Öffne die, die dein Auge brauchen.",
    inbox_client: "KUNDE",
    inbox_subject: "ANFRAGE",
    inbox_status: "STATUS",
    inbox_volume: "VOLUMEN",
    inbox_inbound: "EINGANG",
    inbox_ai_activity: "ISQ7-Aktivität · letzte 3 Stunden",
    live: "live",
    // Inquiry detail
    inquiry_label: "Anfrage",
    inquiry_label_vip: "VIP-Anfrage",
    inquiry_from: "Von",
    inquiry_received: "empfangen",
    vip_rule_triggered: "VIP-Regel (r3) hat gegriffen",
    vip_rule_body: "Die Philharmoniker sind explizit als VIP hinterlegt. Keine Auto-Reply. ISQ7 hat einen Entwurf vorbereitet - <b>du</b> entscheidest, was rausgeht.",
    ai_did_in_47s: "Was ISQ7 in 47 Sekunden gemacht hat",
    recommended_total: "Empfohlener Gesamtpreis",
    per_room_night: "pro Zimmer · pro Nacht",
    per_deluxe_night: "Deluxe · pro Zimmer · pro Nacht",
    review_proposal: "Angebot prüfen",
    // Steps
    step_email_read: "E-Mail gelesen · {lang} + {intent} erkannt",
    step_extract: "Strukturierte Daten extrahiert",
    step_auto_reply: "Auto-Reply in gleicher Sprache gesendet",
    step_vip_no_reply: "VIP erkannt (Regel r3) - KEINE Auto-Reply. Entwurf wartet auf dich.",
    step_market: "Live-Raten von 4 Wiener Mitbewerbern geholt",
    step_event: "Event-Erkennung",
    // Email panel
    email_to: "An",
    email_subject: "Betreff",
    email_received: "Empfangen",
    email_sent: "Gesendet",
    auto_reply_47s: "+47s nach Eingang",
    auto_reply_body_tpl: "Sehr geehrte{salute} {name},\n\nvielen Dank für Ihre Anfrage. Wir prüfen Verfügbarkeit und Raten und senden Ihnen bis heute Nachmittag ein maßgeschneidertes Angebot.\n\nHerzliche Grüße\nAndreas Bauer\nGroup Sales · The Lakeview Vienna",
    extracted_fields: "EXTRAHIERTE FELDER",
    live_rates_vienna: "LIVE-RATEN · WIEN",
    rate_source: "Quelle: Amadeus iHotelier · aktualisiert vor 2 Minuten",
    vip_mode_active: "VIP-Modus aktiv",
    vip_no_autoreply: "Keine Auto-Reply gesendet. Du entscheidest.",
    vip_draft_prepared: "ISQ7 hat einen Entwurf vorbereitet. Unten im Abschnitt „Antwort-Entwurf“ kannst du ihn bearbeiten oder direkt senden.",
    // Customer Memory
    customer_profile: "Kundenprofil",
    new_customer: "Neukunde",
    new_badge: "NEU",
    no_history: "Keine Historie bei The Lakeview",
    how_ai_handles: "Wie ISQ7 damit umgeht",
    key_customer: "Schlüsselkunde",
    regular_customer: "Bestandskunde",
    since: "seit",
    bookings: "BUCHUNGEN",
    avg_discount: "Ø RABATT",
    lifetime_value: "LIFETIME VALUE",
    rating: "RATING",
    why_discount_logic: "Warum diese Rabatt-Logik",
    booking_history: "Buchungshistorie",
    hist_when: "WANN",
    hist_what: "WAS",
    hist_rate: "RATE",
    hist_discount: "RABATT",
    hist_reason: "GRUND",
    no_discount: "kein Rabatt",
    // VIP draft
    vip_draft_title: "Antwort-Entwurf · wartet auf dich",
    vip_draft_desc: "Bearbeite den Entwurf direkt oder sende ihn wie er ist. Du hast das letzte Wort.",
    vip_send_draft: "Entwurf so senden",
    vip_draft_sent: "✓ Entwurf gesendet",
    vip_have_ai_adjust: "Anpassen lassen ✦",
    vip_sent_to_tpl: "Gesendet an {email}. Dr. Grossbauer wird informiert.",
    // Pricing
    pricing_label: "Angebot",
    pricing_title_tpl: "Warum {rate}?",
    pricing_lede: "Basiert auf Live-Marktdaten und dem Event-Fenster.",
    market_rates_tpl: "Markt-Raten · Wien · {dates}",
    updated_2min: "vor 2 min aktualisiert",
    the_lakeview_you: "The Lakeview (du)",
    your_current: "DEIN PREIS (Ø)",
    breakdown: "Aufstellung",
    total: "Total",
    adjust_with_ai: "Mit ISQ7 anpassen",
    understands_freetext: "versteht Freitext",
    adjust_placeholder: "Was möchtest du an diesem Angebot ändern? Beschreibe es einfach.",
    sugg_discount: "Gib 10% Rabatt",
    sugg_breakfast: "Frühstück dazugeben",
    sugg_premium: "Premium-F&B-Paket statt Standard",
    sugg_deadline: "Deadline um eine Woche verlängern",
    adjust_input_ph: "z.B.: Gib Stammkunden-Rabatt von 10% und füge Frühstück dazu.",
    adjust_send: "✦ Senden",
    adjust_error: "Konnte das nicht umsetzen. Formuliere es bitte anders.",
    approve_send: "✓ Freigeben & senden",
    sending: "Sende...",
    adjust: "Anpassen",
    close: "Schließen",
    // Sent
    proposal_sent: "Angebot gesendet",
    total_sent_by_tpl: "Total {total} · gesendet {when} von {who}",
    email_to_tpl: "E-Mail an {name}",
    tracked: "E-Response · tracked",
    your_proposal_for: "Ihr Angebot:",
    follow_up_plan: "Follow-up Plan",
    ai_orchestrated: "ISQ7 orchestriert",
    back_to_inbox: "Zurück zur Inbox",
    view_analytics: "Analytics ansehen",
    // Market Monitor
    monitor_eyebrow: "Markt-Monitor · Live Wien",
    monitor_title: "Der Markt um dich herum.",
    monitor_lede: "Wo stehen deine Mitbewerber, welche Events treiben die Nachfrage, und wo hast du Spielraum?",
    market_avg_today: "MARKT Ø HEUTE",
    position: "POSITION",
    vs_market_avg: "vs. Markt Ø",
    trend_7d: "7-TAGE-TREND",
    market_rising: "Markt zieht an",
    occupancy: "AUSLASTUNG",
    vs_week: "pp vs. Woche",
    filter_today: "Heute",
    filter_7d: "7 Tage",
    filter_30d: "30 Tage",
    snapshot_today: "Competitor Snapshot · Heute",
    snapshot_7d: "Competitor Snapshot · 7-Tage-Trend",
    snapshot_30d: "Competitor Snapshot · 30-Tage-Trend",
    updated_2min_short: "aktualisiert vor 2 min",
    standard_corp_rate: "Standard-Corp-Rate",
    stable: "stabil",
    ai_insight: "✦ ISQ7 INSIGHT",
    monitor_insight_body: "NH Wien City zieht stark an (<b>+18€</b> in 30 Tagen) - sie reagieren aggressiv auf den Medical Congress und die Festwochen. Dein Preis bleibt stabil, was Corp-Kunden (OMV, Siemens) als Stability-Story lesen. <b>Empfehlung:</b> für Leisure-Anfragen darfst du +8-12% aggressiv nachziehen, Corp-Raten hältst du. 6 Stammkunden haben in den letzten 90 Tagen gebucht - die Retention-Strategie läuft.",
    upcoming_events: "Kommende Events",
    next_9_months: "9 Monate",
    in_days_tpl: "in {d}d",
    price_corridor: "Dein Preis-Korridor",
    floor: "Min (Floor)",
    corp_rate_omv: "Corp Rate (OMV)",
    standard_bar: "Standard BAR",
    event_surge: "Event-Surge",
    ceiling: "Max (Ceiling)",
    peak_njk: "Peak-Season (NJK)",
    // Analytics
    analytics_eyebrow: "Letzte 30 Tage",
    analytics_title: "Es funktioniert.",
    analytics_lede: "31 Gruppen-Buchungen gewonnen. Antwortzeit unter 30 Sekunden im Schnitt. € 264.500 Pipeline.",
    kpi_conversion: "CONVERSION",
    kpi_avg_rev: "Ø UMSATZ/ANFRAGE",
    kpi_bookings: "BUCHUNGEN",
    kpi_avg_response: "Ø ANTWORTZEIT",
    kpi_ai_autonomy: "ISQ7-AUTONOMIE",
    auto_parse: "Auto-Parse",
    full_cycles_no_human: "volle Zyklen ohne Mensch",
    of_247: "von 247 Anfragen",
    funnel: "Anfragen-Funnel",
    funnel_period: "22. März → 22. April",
    funnel_received: "Empfangen",
    funnel_parsed: "Geparsed",
    funnel_priced: "Bepreist",
    funnel_sent: "Gesendet",
    funnel_won: "Gewonnen",
    top_segments: "Top-Segmente",
    seg_corp_mice: "Corporate MICE",
    seg_gala: "Gala / Events",
    seg_training: "Training / RFP",
    ai_suggestions: "ISQ7-Vorschläge",
    based_on_data: "basierend auf Daten",
    sugg_late_co_t: "Late-Checkout-Preis senken",
    sugg_late_co_d: "EUR 25 → EUR 19. Historie: +28% Annahme bei Corporate.",
    sugg_fnb_t: "F&B-Bundle als Default",
    sugg_fnb_d: "Groups 40+ → Gala-Dinner auto-anbieten. +EUR 2.150/Event.",
    sugg_appr_t: "Approval-Schwelle erhöhen",
    sugg_appr_d: "EUR 10k → 12k autonom. Spart 3h/Monat Review-Zeit.",
    sugg_omv_t: "OMV-Retention läuft",
    sugg_omv_d: "6 Wins in 90d. Corp-Band € 99-119 nicht aufweichen.",
    sugg_tech_t: "Tech-Segment Preis senken",
    sugg_tech_d: "Nach Google-Lost: -8% Default-Rate für Dev-Events.",
    handled_by: "Bearbeitet von",
    ai_auto: "ISQ7 (vollautomatisch)",
    // Archive
    archive_eyebrow: "Archiv",
    archive_title: "Abgeschlossene Anfragen.",
    archive_lede_tpl: "{total} Anfragen in den letzten 60 Tagen · {wr}% Win-Rate · {rev} Umsatz.",
    out_won: "Gewonnen",
    out_lost: "Verloren",
    out_recurring: "Stammkunde",
    filter_all: "Alle",
    filter_won: "Gewonnen",
    filter_lost: "Verloren",
    filter_recurring: "Stammkunden",
    arch_client: "KUNDE",
    arch_inquiry: "ANFRAGE",
    arch_outcome: "OUTCOME",
    arch_volume: "VOLUMEN",
    arch_handled: "BEARBEITET",
    no_in_category: "Keine Anfragen in dieser Kategorie.",
    archive_footer: "Ältere Anfragen werden nach 12 Monaten automatisch archiviert. Export via CSV / Excel in den Einstellungen.",
    back_to_archive: "Zurück zum Archiv",
    deal_won_title: "Deal gewonnen.",
    deal_won_sub: "Dieser Deal ist abgeschlossen. Hier ist was passiert und was wir gelernt haben.",
    deal_lost_title: "Deal verloren.",
    deal_lost_sub: "Wir haben diesen Deal nicht gewonnen. ISQ7 hat die Signale aufgezeichnet und angepasst.",
    deal_recurring_title: "Wiederkehrender Deal.",
    deal_recurring_sub: "Teil eines Rahmenvertrags. Wurde vollautomatisch abgewickelt.",
    result: "Ergebnis",
    offer: "ANGEBOT",
    final: "FINAL",
    not_achieved: "NICHT ERZIELT",
    response_time: "ANTWORTZEIT",
    handled_by_cap: "BEARBEITET VON",
    lost_reason: "GRUND FÜR ABSAGE",
    negotiation: "VERHANDLUNG",
    negotiated_from_tpl: "Von {off} auf {val} nachverhandelt · Differenz {diff}.",
    timeline: "Timeline",
    events_cnt: "Events",
    what_ai_learned: "Was ISQ7 gelernt hat",
    lessons_cnt: "Lessons",
    // Settings
    settings_eyebrow: "ISQ7-Konfiguration",
    settings_title: "Sag ISQ7, wie es arbeiten soll.",
    settings_lede: "In deinen eigenen Worten. Keine Slider, kein Code. Du schreibst die Regeln - ISQ7 versteht sie.",
    add_new_rule: "Neue Regel hinzufügen",
    all_saved: "alle Änderungen gespeichert",
    saving: "speichere ...",
    pick_cat: "Wähle eine Kategorie und schreibe die Regel in natürlicher Sprache.",
    ctrl_enter: "⌘/Strg + Enter",
    add_rule_btn: "✦ Hinzufügen",
    active_rules_cnt: "Aktive Regeln",
    click_to_edit: "klicke in den Text zum Bearbeiten",
    no_rules_yet: "Noch keine Regeln. ISQ7 folgt seinen Default-Richtlinien.",
    save_version: "✓ Version speichern",
    history: "Historie",
    reset_defaults: "Auf Defaults zurücksetzen",
    rule_deleted: "Regel gelöscht.",
    undo: "Rückgängig",
    confirm_reset: "Auf Default-Regeln zurücksetzen? Aktuelle Regeln gehen verloren (ausser du speicherst vorher eine Version).",
    // Categories
    cat_authority: "Autorität",
    cat_vip: "VIP",
    cat_escalation: "Eskalation",
    cat_context: "Kontext",
    cat_tone: "Ton",
    cat_event: "Event",
  },
  en: {
    // Sidebar
    nav_inquiries: "Inquiries",
    nav_monitor: "Market Monitor",
    nav_analytics: "Analytics",
    nav_archive: "Archive",
    nav_settings: "ISQ7 Configuration",
    // Topbar
    back: "Back",
    today: "Today",
    last_30_days: "Last 30 days",
    vienna_live: "Vienna · Live",
    hotel_live: "The Lakeview Vienna",
    // Tags
    tag_new: "New",
    tag_priced: "Priced",
    tag_sent: "Sent",
    tag_vip: "VIP",
    // Inbox
    inbox_greeting: "Good morning, Andreas",
    inbox_headline_tpl: "You have {n} open inquiries.",
    inbox_lede: "ISQ7 has read, classified and priced each one. Open the ones that need your eyes.",
    inbox_client: "CLIENT",
    inbox_subject: "INQUIRY",
    inbox_status: "STATUS",
    inbox_volume: "VOLUME",
    inbox_inbound: "INBOUND",
    inbox_ai_activity: "ISQ7 Activity · Last 3 hours",
    live: "live",
    // Inquiry detail
    inquiry_label: "Inquiry",
    inquiry_label_vip: "VIP Inquiry",
    inquiry_from: "From",
    inquiry_received: "received",
    vip_rule_triggered: "VIP rule (r3) triggered",
    vip_rule_body: "The Philharmonic is explicitly flagged as VIP. No auto-reply. ISQ7 prepared a draft - <b>you</b> decide what goes out.",
    ai_did_in_47s: "What ISQ7 did in 47 seconds",
    recommended_total: "Recommended total",
    per_room_night: "per room · per night",
    per_deluxe_night: "Deluxe · per room · per night",
    review_proposal: "Review proposal",
    // Steps
    step_email_read: "Email read · {lang} + {intent} detected",
    step_extract: "Structured data extracted",
    step_auto_reply: "Auto-reply sent in same language",
    step_vip_no_reply: "VIP detected (rule r3) - NO auto-reply. Draft awaits your approval.",
    step_market: "Live rates from 4 Vienna competitors fetched",
    step_event: "Event detection",
    // Email panel
    email_to: "To",
    email_subject: "Subject",
    email_received: "Received",
    email_sent: "Sent",
    auto_reply_47s: "+47s after inbound",
    auto_reply_body_tpl: "Dear {salute} {name},\n\nthank you for your inquiry. We are checking availability and rates and will send you a tailored proposal by this afternoon.\n\nBest regards,\nAndreas Bauer\nGroup Sales · The Lakeview Vienna",
    extracted_fields: "EXTRACTED FIELDS",
    live_rates_vienna: "LIVE RATES · VIENNA",
    rate_source: "Source: Amadeus iHotelier · updated 2 minutes ago",
    vip_mode_active: "VIP mode active",
    vip_no_autoreply: "No auto-reply sent. You decide.",
    vip_draft_prepared: "ISQ7 has prepared a draft. Below in the „Response Draft“ section you can edit it or send it directly.",
    // Customer Memory
    customer_profile: "Customer profile",
    new_customer: "New customer",
    new_badge: "NEW",
    no_history: "No history at The Lakeview",
    how_ai_handles: "How ISQ7 handles this",
    key_customer: "Key customer",
    regular_customer: "Regular customer",
    since: "since",
    bookings: "BOOKINGS",
    avg_discount: "AVG DISCOUNT",
    lifetime_value: "LIFETIME VALUE",
    rating: "RATING",
    why_discount_logic: "Why this discount logic",
    booking_history: "Booking history",
    hist_when: "WHEN",
    hist_what: "WHAT",
    hist_rate: "RATE",
    hist_discount: "DISCOUNT",
    hist_reason: "REASON",
    no_discount: "no discount",
    // VIP draft
    vip_draft_title: "Response Draft · awaiting your approval",
    vip_draft_desc: "Edit the draft directly or send it as-is. You have the final word.",
    vip_send_draft: "Send draft as-is",
    vip_draft_sent: "✓ Draft sent",
    vip_have_ai_adjust: "Have ISQ7 adjust ✦",
    vip_sent_to_tpl: "Sent to {email}. Dr. Grossbauer will be notified.",
    // Pricing
    pricing_label: "Proposal",
    pricing_title_tpl: "Why {rate}?",
    pricing_lede: "Based on live market data and the event window.",
    market_rates_tpl: "Market Rates · Vienna · {dates}",
    updated_2min: "updated 2 min ago",
    the_lakeview_you: "The Lakeview (you)",
    your_current: "YOUR PRICE (avg)",
    breakdown: "Breakdown",
    total: "Total",
    adjust_with_ai: "Adjust with ISQ7",
    understands_freetext: "understands free text",
    adjust_placeholder: "What would you like to change? Describe it in your own words.",
    sugg_discount: "Give 10% discount",
    sugg_breakfast: "Add breakfast",
    sugg_premium: "Premium F&B package instead of standard",
    sugg_deadline: "Extend deadline by one week",
    adjust_input_ph: "e.g. Give regular-customer discount of 10% and add breakfast.",
    adjust_send: "✦ Send",
    adjust_error: "Couldn't apply that. Please rephrase.",
    approve_send: "✓ Approve & send",
    sending: "Sending...",
    adjust: "Adjust",
    close: "Close",
    // Sent
    proposal_sent: "Proposal sent",
    total_sent_by_tpl: "Total {total} · sent {when} by {who}",
    email_to_tpl: "Email to {name}",
    tracked: "E-Response · tracked",
    your_proposal_for: "Your proposal:",
    follow_up_plan: "Follow-up plan",
    ai_orchestrated: "ISQ7 orchestrated",
    back_to_inbox: "Back to inbox",
    view_analytics: "View analytics",
    // Market Monitor
    monitor_eyebrow: "Market Monitor · Live Vienna",
    monitor_title: "The market around you.",
    monitor_lede: "Where do your competitors stand, which events drive demand, and where do you have room to move?",
    market_avg_today: "MARKET AVG TODAY",
    position: "POSITION",
    vs_market_avg: "vs. market avg",
    trend_7d: "7-DAY TREND",
    market_rising: "Market rising",
    occupancy: "OCCUPANCY",
    vs_week: "pp vs. last week",
    filter_today: "Today",
    filter_7d: "7 days",
    filter_30d: "30 days",
    snapshot_today: "Competitor Snapshot · Today",
    snapshot_7d: "Competitor Snapshot · 7-day trend",
    snapshot_30d: "Competitor Snapshot · 30-day trend",
    updated_2min_short: "updated 2 min ago",
    standard_corp_rate: "Standard corp rate",
    stable: "stable",
    ai_insight: "✦ ISQ7 INSIGHT",
    monitor_insight_body: "NH Wien City is surging hard (<b>+18€</b> in 30 days) - they're reacting aggressively to the Medical Congress and Festwochen. Your price stays stable, which Corp clients (OMV, Siemens) read as a stability story. <b>Recommendation:</b> for leisure inquiries you can chase +8-12% aggressively, corp rates you hold. 6 regular clients have booked in the last 90 days - the retention strategy works.",
    upcoming_events: "Upcoming Events",
    next_9_months: "9 months",
    in_days_tpl: "in {d}d",
    price_corridor: "Your price corridor",
    floor: "Min (Floor)",
    corp_rate_omv: "Corp Rate (OMV)",
    standard_bar: "Standard BAR",
    event_surge: "Event Surge",
    ceiling: "Max (Ceiling)",
    peak_njk: "Peak Season (NYE)",
    // Analytics
    analytics_eyebrow: "Last 30 days",
    analytics_title: "It's working.",
    analytics_lede: "31 group bookings won. Avg response time under 30 seconds. € 264.500 pipeline.",
    kpi_conversion: "CONVERSION",
    kpi_avg_rev: "AVG REVENUE/INQUIRY",
    kpi_bookings: "BOOKINGS",
    kpi_avg_response: "AVG RESPONSE",
    kpi_ai_autonomy: "ISQ7 AUTONOMY",
    auto_parse: "Auto-parse",
    full_cycles_no_human: "full cycles without human",
    of_247: "of 247 inquiries",
    funnel: "Inquiries Funnel",
    funnel_period: "22 March → 22 April",
    funnel_received: "Received",
    funnel_parsed: "Parsed",
    funnel_priced: "Priced",
    funnel_sent: "Sent",
    funnel_won: "Won",
    top_segments: "Top segments",
    seg_corp_mice: "Corporate MICE",
    seg_gala: "Gala / Events",
    seg_training: "Training / RFP",
    ai_suggestions: "ISQ7 Suggestions",
    based_on_data: "based on data",
    sugg_late_co_t: "Lower Late Checkout price",
    sugg_late_co_d: "EUR 25 → EUR 19. History: +28% uptake from Corporate.",
    sugg_fnb_t: "F&B bundle as default",
    sugg_fnb_d: "Groups 40+ → auto-offer Gala Dinner. +EUR 2,150/event.",
    sugg_appr_t: "Raise approval threshold",
    sugg_appr_d: "EUR 10k → 12k autonomous. Saves 3h/month review time.",
    sugg_omv_t: "OMV retention working",
    sugg_omv_d: "6 wins in 90d. Don't soften the corp band € 99-119.",
    sugg_tech_t: "Lower tech-segment price",
    sugg_tech_d: "After Google loss: -8% default rate for dev events.",
    handled_by: "Handled by",
    ai_auto: "ISQ7 (fully automatic)",
    // Archive
    archive_eyebrow: "Archive",
    archive_title: "Closed inquiries.",
    archive_lede_tpl: "{total} inquiries in the last 60 days · {wr}% win rate · {rev} revenue.",
    out_won: "Won",
    out_lost: "Lost",
    out_recurring: "Recurring",
    filter_all: "All",
    filter_won: "Won",
    filter_lost: "Lost",
    filter_recurring: "Recurring",
    arch_client: "CLIENT",
    arch_inquiry: "INQUIRY",
    arch_outcome: "OUTCOME",
    arch_volume: "VOLUME",
    arch_handled: "HANDLED BY",
    no_in_category: "No inquiries in this category.",
    archive_footer: "Older inquiries are automatically archived after 12 months. Export to CSV / Excel available in Settings.",
    back_to_archive: "Back to archive",
    deal_won_title: "Deal won.",
    deal_won_sub: "This deal is closed. Here's what happened and what we learned.",
    deal_lost_title: "Deal lost.",
    deal_lost_sub: "We didn't win this deal. ISQ7 captured the signals and adjusted.",
    deal_recurring_title: "Recurring deal.",
    deal_recurring_sub: "Part of a framework contract. Fully automated.",
    result: "Result",
    offer: "OFFER",
    final: "FINAL",
    not_achieved: "NOT ACHIEVED",
    response_time: "RESPONSE TIME",
    handled_by_cap: "HANDLED BY",
    lost_reason: "REASON FOR LOSS",
    negotiation: "NEGOTIATION",
    negotiated_from_tpl: "Negotiated from {off} down to {val} · difference {diff}.",
    timeline: "Timeline",
    events_cnt: "events",
    what_ai_learned: "What ISQ7 learned",
    lessons_cnt: "lessons",
    // Settings
    settings_eyebrow: "ISQ7 Configuration",
    settings_title: "Tell ISQ7 how to work.",
    settings_lede: "In your own words. No sliders, no code. You write the rules - ISQ7 understands them.",
    add_new_rule: "Add new rule",
    all_saved: "all changes saved",
    saving: "saving ...",
    pick_cat: "Pick a category and write the rule in natural language.",
    ctrl_enter: "⌘/Ctrl + Enter",
    add_rule_btn: "✦ Add",
    active_rules_cnt: "Active rules",
    click_to_edit: "click in the text to edit",
    no_rules_yet: "No rules yet. ISQ7 follows its default guidelines.",
    save_version: "✓ Save version",
    history: "History",
    reset_defaults: "Reset to defaults",
    rule_deleted: "Rule deleted.",
    undo: "Undo",
    confirm_reset: "Reset to default rules? Current rules will be lost (unless you save a version first).",
    // Categories
    cat_authority: "Authority",
    cat_vip: "VIP",
    cat_escalation: "Escalation",
    cat_context: "Context",
    cat_tone: "Tone",
    cat_event: "Event",
  },
};

const LangCtx = createContext({ lang: "de", t: (k) => k });
const useT = () => useContext(LangCtx).t;
const useLang = () => useContext(LangCtx);

function tFmt(s, args) {
  if (!args) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in args ? args[k] : "{" + k + "}"));
}


// =========================================================================
// DATA
// =========================================================================

const INQUIRIES = {
  phil: {
    id: "phil", co: "Wiener Philharmoniker", from: "Dr. Andreas Grossbauer", email: "a.grossbauer@wienerphilharmoniker.at",
    summary: "60 Zimmer · Neujahrskonzert · 30.12.-02.01.", summaryEn: "60 rooms · New Year's Concert · Dec 30 - Jan 2",
    value: 48600, tag: "VIP", tone: "vip", status: "vip",
    vip: true,
    emailSubject: "Vertrauliche Anfrage · Ehrengäste Neujahrskonzert 2027",
    emailBody: `Sehr geehrter Herr Bauer,

für unsere Ehrengäste beim Neujahrskonzert 2027 suchen wir 60 Zimmer in höchster Kategorie vom 30. 12. 2026 bis 02. 01. 2027. Die Gäste reisen teils mit Protokoll, höchste Diskretion vorausgesetzt.

Zusätzlich: exklusiver Empfang am 31. 12., abgeschirmter Transfer zum Musikverein, Late Check-out 01. 01.

Wir vertrauen wie immer auf Ihre Diskretion und bitten um ein persönliches Angebot.

Mit musikalischen Grüßen
Dr. Andreas Grossbauer
Generalsekretär · Wiener Philharmoniker`,
    language: "DE", intent: "VIP Protocol", intentEn: "VIP Protocol", confidence: "99 %",
    extract: [["Firma", "Wiener Philharmoniker"], ["Ansprechpartner", "Dr. A. Grossbauer · Generalsekretär"], ["Zimmer", "60 × Deluxe / Suite (gemischt)"], ["Nächte", "3 (30.12. - 02.01.)"], ["Ereignis", "Neujahrskonzert · Ehrengäste"], ["Besonderheit", "Protokoll · Diskretion · Transfers"], ["VIP-Status", "Tier 1 · persönliche Betreuung"]],
    extractEn: [["Company", "Wiener Philharmoniker"], ["Contact", "Dr. A. Grossbauer · Secretary General"], ["Rooms", "60 × Deluxe / Suite (mixed)"], ["Nights", "3 (Dec 30 - Jan 2)"], ["Event", "New Year's Concert · honored guests"], ["Special", "Protocol · Discretion · Transfers"], ["VIP Tier", "Tier 1 · personal handling"]],
    market: [
      { n: "Novum Kavalier", p: 145 },
      { n: "the niu Franz", p: 175 },
      { n: "Mercure Vienna", p: 209 },
      { n: "NH Wien City", p: 239 },
    ],
    event: { pill: "Peak-Event", pillEn: "Peak Event", tone: "red", dates: "30.12. - 02.01.", name: "Neujahrskonzert Wien", nameEn: "Vienna New Year's Concert", body: "Teuerstes Preis-Fenster des Jahres. Nachfrage +60-80% über Markt. Für VIP-Gäste der Philharmoniker kein Upcharge - Beziehung > Marge.", bodyEn: "Most expensive pricing window of the year. Demand +60-80% above market. No upcharge for Philharmonic VIP guests - relationship > margin." },
    lines: [
      { k: "40 Deluxe × 3 Nächte × € 310", v: 37200 },
      { k: "20 Suite × 3 Nächte × € 490", v: 29400 },
      { k: "Protokoll-Services + Transfers", v: 4800 },
      { k: "Exklusiver Empfang 31.12.", v: 7800 },
      { k: "VIP-Stammkunden-Rabatt (-15%)", v: -11850 },
    ],
    rate: 310, rateHint: "Deluxe · pro Zimmer · pro Nacht", rateHintEn: "Deluxe · per room · per night",
    receivedAt: "Heute · 07:42", receivedAtEn: "Today · 07:42", urgency: "Antwort bis morgen 12:00", urgencyEn: "Response by tomorrow 12:00",
    draftReply: `Sehr geehrter Herr Dr. Grossbauer,

herzlichen Dank für Ihr Vertrauen und die erneute Anfrage für das Neujahrskonzert 2027.

Ich bereite Ihnen persönlich ein maßgeschneidertes Angebot vor und melde mich bis Mittwoch mit Details zur Zimmerallokation, Protokoll-Koordination und dem Empfang am 31. 12.

Für Rückfragen stehe ich Ihnen selbstverständlich jederzeit direkt zur Verfügung.

Mit den besten Grüßen
Andreas Bauer
Director Group Sales · The Lakeview Vienna`,
  },
  omv: {
    id: "omv", co: "OMV AG", from: "Sarah Mueller", email: "sarah.mueller@omv.com",
    summary: "25 Zimmer · Konferenz · 15.-17. April", summaryEn: "25 rooms · Conference · Apr 15-17",
    value: 9530, tag: "Bepreist", tone: "accent", status: "priced",
    emailSubject: "Anfrage: Konferenz + Zimmerkontingent 15.-17. April",
    emailBody: `Sehr geehrtes Lakeview-Team,

für unser Executive-Off-Site vom 15. bis 17. April benötigen wir ein Zimmerkontingent von 25 Einzelzimmern sowie einen Konferenzraum für 30 Personen inklusive Technik.

An beiden Tagen bitten wir um ein Mittagsbuffet. Anreise 15.04. ab 14:00, Abreise 17.04. bis 12:00.

Als wiederkehrender Corporate-Kunde verlassen wir uns auf unser bestehendes Rate Agreement. Ich freue mich über ein Angebot bis Donnerstag.

Mit freundlichen Grüßen
Sarah Mueller
Sales Director Austria · OMV AG`,
    language: "DE", intent: "Corporate MICE", intentEn: "Corporate MICE", confidence: "98 %",
    extract: [["Firma", "OMV AG"], ["Ansprechpartner", "Sarah Mueller"], ["Zimmer", "25 × EZ"], ["Nächte", "2 (15.-17.04.)"], ["Konferenzraum", "30 Pax · mit Technik"], ["F&B", "2× Lunch-Buffet"], ["Corp Rate", "€ 99-119 (bestehend)"], ["Deadline", "Donnerstag"]],
    extractEn: [["Company", "OMV AG"], ["Contact", "Sarah Mueller"], ["Rooms", "25 × SGL"], ["Nights", "2 (Apr 15-17)"], ["Conference Room", "30 pax · with tech"], ["F&B", "2× Lunch buffet"], ["Corp Rate", "€ 99-119 (existing)"], ["Deadline", "Thursday"]],
    market: [
      { n: "Novum Kavalier", p: 95 },
      { n: "the niu Franz", p: 109 },
      { n: "Mercure Vienna", p: 119 },
      { n: "NH Wien City", p: 135 },
    ],
    event: { pill: "Event-Surge", pillEn: "Event Surge", tone: "red", dates: "13.-16. April", name: "Vienna Medical Congress", nameEn: "Vienna Medical Congress", body: "Über 700.000 Besucher in Wien erwartet. Hotel-Nachfrage +15-25% über den Zeitraum. ISQ7 hält OMVs Corp-Rate-Ceiling trotz Surge.", bodyEn: "700.000+ visitors expected in Vienna. Hotel demand +15-25% across the window. ISQ7 holds OMV's corp rate ceiling despite surge." },
    lines: [
      { k: "25 Zimmer × 2 Nächte × € 119", v: 5950 },
      { k: "Konferenzraum + Technik", v: 1300 },
      { k: "Lunch-Buffet · 30 Pax × 2", v: 2280 },
    ],
    rate: 119, rateHint: "pro Zimmer · pro Nacht", rateHintEn: "per room · per night",
    receivedAt: "Heute · 09:23", receivedAtEn: "Today · 09:23", urgency: "Angebot bis Donnerstag", urgencyEn: "Proposal by Thursday",
  },
  sie: {
    id: "sie", co: "Siemens AG", from: "Markus Kraft", email: "markus.kraft@siemens.com",
    summary: "18 Zimmer · Training · 4.-7. Mai", summaryEn: "18 rooms · Training · May 4-7",
    value: 12480, tag: "Bepreist", tone: "accent", status: "priced",
    emailSubject: "RFP Siemens Executive Training Wien, 04.-07. Mai",
    emailBody: `Liebes Lakeview-Team,

wir planen ein internes Führungskräfte-Training vom 4. bis 7. Mai in Wien. Benötigt: 18 Einzelzimmer, ein Tagungsraum für 20 Personen mit U-Form, täglich Tagungspauschale (inkl. Kaffeepausen und Mittagessen).

Bitte Angebot an unsere Procurement-Abteilung.

Beste Grüße
Markus Kraft
Global Travel · Siemens AG`,
    language: "DE", intent: "Corporate Training", confidence: "96 %",
    extract: [["Firma", "Siemens AG"], ["Ansprechpartner", "Markus Kraft"], ["Zimmer", "18 × EZ"], ["Nächte", "3 (04.-07.05.)"], ["Tagungsraum", "20 Pax · U-Form"], ["F&B", "Tagungspauschale × 3"], ["Empfänger", "procurement@siemens.com"]],
    market: [
      { n: "Novum Kavalier", p: 89 },
      { n: "the niu Franz", p: 115 },
      { n: "Mercure Vienna", p: 125 },
      { n: "NH Wien City", p: 139 },
    ],
    event: { pill: "Normale Saison", tone: "accent", dates: "04.-07. Mai", name: "Kein Event-Impact", body: "In diesem Zeitraum sind keine Großveranstaltungen erfasst. Nachfrage im Markt ist saisontypisch (Auslastung ~78%)." },
    lines: [
      { k: "18 Zimmer × 3 Nächte × € 149", v: 8046 },
      { k: "Tagungsraum × 3 Tage", v: 1800 },
      { k: "Tagungspauschale · 20 × 3", v: 2634 },
    ],
    rate: 149, rateHint: "pro Zimmer · pro Nacht", rateHintEn: "per room · per night",
    receivedAt: "Heute · 08:11", receivedAtEn: "Today · 08:11", urgency: "RFP-Deadline 28. 4.", urgencyEn: "RFP deadline Apr 28",
  },
  erb: {
    id: "erb", co: "Erste Bank", from: "Dr. Claudia Steiner", email: "claudia.steiner@erstegroup.com",
    summary: "40 Zimmer · Gala-Dinner · 12. Mai", summaryEn: "40 rooms · Gala Dinner · May 12",
    value: 24910, tag: "Gesendet", tone: "green", status: "sent",
    emailSubject: "Erste Bank Jahresgala 2026 - Festliches Dinner + Übernachtung",
    emailBody: `Liebe Kolleginnen und Kollegen,

für unsere Jahresgala am 12. Mai benötigen wir 40 Zimmer (Standard, Einzelnutzung) sowie einen Bankettsaal für ein festliches Gala-Dinner mit ca. 180 Gästen.

Es soll ein 4-Gang-Menü inkl. korrespondierender Weinbegleitung geben, Sektempfang ab 18:30.

Mit besten Grüßen
Dr. Claudia Steiner
Head of Corporate Events · Erste Group`,
    language: "DE", intent: "Corporate Gala", confidence: "99 %",
    extract: [["Firma", "Erste Group"], ["Ansprechpartner", "Dr. Claudia Steiner"], ["Zimmer", "40 × EZ"], ["Nächte", "1 (12.05.)"], ["Event", "Gala-Dinner · 180 Pax"], ["F&B", "4-Gang + Weinbegleitung + Sekt"], ["Empfang", "ab 18:30"]],
    market: [
      { n: "Novum Kavalier", p: 92 },
      { n: "the niu Franz", p: 112 },
      { n: "Mercure Vienna", p: 125 },
      { n: "NH Wien City", p: 140 },
    ],
    event: { pill: "Wochenende", tone: "gold", dates: "12. Mai", name: "Muttertags-Wochenende", body: "Leicht erhöhte Leisure-Nachfrage. ISQ7 hat das Gala-Paket als Premium positioniert." },
    lines: [
      { k: "40 Zimmer × 1 Nacht × € 159", v: 6360 },
      { k: "Bankettsaal + Deko", v: 4200 },
      { k: "4-Gang-Gala · 180 Pax", v: 11700 },
      { k: "Sektempfang + Weinbegleitung", v: 2650 },
    ],
    rate: 159, rateHint: "pro Zimmer · pro Nacht", rateHintEn: "per room · per night",
    receivedAt: "Gestern · 16:22", receivedAtEn: "Yesterday · 16:22", urgency: "Angebot versendet", urgencyEn: "Proposal sent",
    sentAt: "Gestern · 16:42", sentBy: "Andreas Bauer",
    followUps: [
      { at: "T+0", label: "Angebot gesendet per E-Response", done: true },
      { at: "T+4h", label: "Öffnungsbestätigung empfangen", done: true },
      { at: "T+24h", label: "Automatische Erinnerung", done: false },
      { at: "T+72h", label: "Eskalation an Sales-Manager", done: false },
    ],
  },
  bmw: {
    id: "bmw", co: "BMW Wien", from: "Lisa Hofmann", email: "lisa.hofmann@bmw.at",
    summary: "12 Zimmer · Incentive · 28.-30. April", summaryEn: "12 rooms · Incentive · Apr 28-30",
    value: 5720, tag: "Bepreist", tone: "gold", status: "priced",
    emailSubject: "Incentive-Trip Top-Verkäufer · 28.-30. April",
    emailBody: `Hallo!

Wir machen unseren jährlichen Incentive-Trip für unsere besten Verkäufer. 12 Zimmer für 28.-30. April, nichts Großes, aber gerne ein nettes Abendessen am ersten Abend.

Hätten Sie da was für uns?

LG Lisa Hofmann
BMW Wien`,
    language: "DE", intent: "Leisure Incentive", confidence: "92 %",
    extract: [["Firma", "BMW Wien"], ["Ansprechpartner", "Lisa Hofmann"], ["Zimmer", "12 × EZ"], ["Nächte", "2 (28.-30.04.)"], ["F&B", "1× Dinner"], ["Ton", "Informell"]],
    market: [
      { n: "Novum Kavalier", p: 95 },
      { n: "the niu Franz", p: 109 },
      { n: "Mercure Vienna", p: 119 },
      { n: "NH Wien City", p: 129 },
    ],
    event: { pill: "Normale Saison", tone: "accent", dates: "28.-30. April", name: "Kein Event-Impact", body: "Keine Großveranstaltungen. Markt im normalen Korridor." },
    lines: [
      { k: "12 Zimmer × 2 Nächte × € 129", v: 3096 },
      { k: "Dinner · 12 Pax", v: 1080 },
      { k: "Incentive-Upgrade (Suite × 2)", v: 1544 },
    ],
    rate: 129, rateHint: "pro Zimmer · pro Nacht", rateHintEn: "per room · per night",
    receivedAt: "Heute · 10:04", receivedAtEn: "Today · 10:04", urgency: "Kein harter Deadline", urgencyEn: "No hard deadline",
  },
};

const ORDER = ["phil", "omv", "sie", "erb", "bmw"];

const MEMORY = {
  phil: {
    since: "2019", bookings: 7, lifetimeValue: 284500, avgDiscount: 15,
    lastStay: "Dezember 2025 · 40 Zimmer · Silvesterkonzert", rating: "A+",
    notes: "Kern-Beziehung. Generalsekretär persönlich Ansprechpartner. Protokoll-Events mit höchster Diskretion.",
    history: [
      { when: "Dez 2025", what: "Silvesterkonzert · 40 Zimmer", rate: 310, disc: 15, reason: "Stammkunden-Staffel · 5+ Buchungen/Jahr" },
      { when: "Mai 2025", what: "Mozartwoche · 25 Zimmer", rate: 265, disc: 12, reason: "Stammkunden-Staffel" },
      { when: "Dez 2024", what: "Neujahrskonzert · 55 Zimmer", rate: 295, disc: 18, reason: "Stammkunden + Volumen (>50 Zi.)" },
      { when: "Sep 2024", what: "Salzburger Festspiele Transfer", rate: 225, disc: 10, reason: "Stammkunden-Staffel" },
      { when: "Dez 2023", what: "Neujahrskonzert · 48 Zimmer", rate: 279, disc: 15, reason: "Stammkunden + Peak-Season Loyalty" },
    ],
    aiReasoning: "-15% wurde angewendet weil: (a) 5 der letzten 7 Buchungen hatten 12-18% Rabatt - der Kunde erwartet das als Standard, (b) 15% liegt an meiner autonomen Rabatt-Schwelle (Regel r1), (c) die LTV von € 284.500 rechtfertigt es ohne Verhandlung. ABER: weil die Philharmoniker in der VIP-Liste stehen (Regel r3), wurde keine Auto-Reply gesendet - dieses Angebot wartet auf deine persönliche Freigabe.",
  },
  omv: {
    since: "2022", bookings: 2, lifetimeValue: 18400, avgDiscount: 0,
    lastStay: "November 2024 · 18 Zimmer · Board Offsite", rating: "B",
    notes: "Procurement-getrieben, entscheidet nach Preisbenchmark. Freundlich aber transaktional. Corp-Rate-Agreement aktiv (€ 99-119).",
    history: [
      { when: "Nov 2024", what: "Board Offsite · 18 Zimmer", rate: 119, disc: 0, reason: "Corp Rate · kein Rabatt nötig" },
      { when: "Mär 2023", what: "Executive Training · 12 Zimmer", rate: 115, disc: 5, reason: "Neukunden-Willkommen" },
    ],
    aiReasoning: "Kein Rabatt in diesem Angebot. € 119/Nacht = OMVs Corp-Rate-Ceiling. Während des Medical Congress surgen alle Competitors, aber wir halten OMVs vertraglich vereinbarte Obergrenze. Story: 'Stability > Surprise' - wir zeigen dass der Corp Rate auch im Peak gilt. Retention compounds.",
  },
  sie: {
    since: null, bookings: 0, lifetimeValue: 0, avgDiscount: 0, lastStay: "-", rating: "Neu",
    notes: "Erstkontakt. Globales Unternehmen, RFP-Prozess über Procurement.",
    history: [],
    aiReasoning: "Neukunde. Preis bei € 149 verankert - bewusst über Mercure, unter NH. Kein Willkommensrabatt weil Siemens global preistransparent beschafft und ein Rabatt Präzedenz schafft. Statt Preis -> zusätzlichen Wert (kostenloser Konferenz-Tech-Check).",
  },
  erb: {
    since: "2018", bookings: 12, lifetimeValue: 412000, avgDiscount: 8,
    lastStay: "Januar 2026 · 30 Zimmer · Board-Retreat", rating: "A+",
    notes: "Head of Events ist persönlich bekannt. Gala-Dinners traditionell bei uns. Zahlt immer pünktlich.",
    history: [
      { when: "Jan 2026", what: "Board-Retreat · 30 Zimmer", rate: 152, disc: 8, reason: "Stammkunden-Staffel" },
      { when: "Mai 2025", what: "Jahresgala 2025 · 38 Zimmer", rate: 155, disc: 10, reason: "Stammkunden + Event-Gesamtpaket" },
      { when: "Nov 2024", what: "Strategie-Klausur · 22 Zimmer", rate: 145, disc: 7, reason: "Stammkunden-Staffel" },
    ],
    aiReasoning: "-10% Stammkunden-Rabatt angewendet weil: (a) 12 Buchungen seit 2018, (b) durchschnittlicher Rabatt liegt historisch bei 8%, (c) Jahresgala ist ein jährlicher Ankerevent - den zu verlieren wäre teurer als der Rabatt.",
  },
  bmw: {
    since: null, bookings: 0, lifetimeValue: 0, avgDiscount: 0, lastStay: "-", rating: "Neu",
    notes: "Erstkontakt. Informeller Ton deutet auf lokales Team hin.",
    history: [],
    aiReasoning: "Neukunde - Willkommensrabatt nicht nötig, Anfrage ist klein und preisunsensibel (Incentive, der Charakter zählt). Statt Rabatt -> Suite-Upgrade inkludiert. Das fühlt sich wertvoller an als -10%.",
  },
};

const ARCHIVE = [
  {
    id: "a1", co: "Raiffeisen Bank", from: "Verena Weiss", email: "verena.weiss@rbinternational.com", summary: "32 Zimmer · Offsite · 21.-23. März",
    value: 21400, offered: 22800, outcome: "won", sent: "19. März 2026", replied: "12h", handledBy: "Andreas Bauer",
    brief: "Strategie-Offsite, 32 Einzelzimmer, Konferenz, 2x Abendessen.",
    timeline: [
      { t: "18. März 14:08", kind: "in", label: "E-Mail Anfrage empfangen" },
      { t: "18. März 14:08", kind: "ai", label: "ISQ7 hat geparsed · Corporate Strategy Offsite · 98% Confidence" },
      { t: "18. März 14:09", kind: "out", label: "Auto-Reply gesendet (Deutsch)" },
      { t: "18. März 14:12", kind: "ai", label: "Markt-Analyse: Preis-Korridor € 135-160, kein Event-Surge" },
      { t: "18. März 15:40", kind: "rev", label: "Andreas hat Angebot geprüft + genehmigt" },
      { t: "19. März 09:02", kind: "send", label: "Angebot gesendet · € 22.800 (149 €/Nacht, Stammkunden -5%)" },
      { t: "19. März 09:07", kind: "track", label: "E-Mail geöffnet · 5 Min nach Versand" },
      { t: "19. März 14:30", kind: "nego", label: "Kundin antwortet: bittet um Frühstücks-Inklusive" },
      { t: "19. März 15:10", kind: "ai", label: "ISQ7 schlägt vor: Frühstück inkludieren, Rate auf € 145 senken -> Gesamt € 21.400" },
      { t: "19. März 16:22", kind: "send", label: "Revidiertes Angebot gesendet · € 21.400" },
      { t: "20. März 10:14", kind: "won", label: "Zusage per E-Mail" },
    ],
    learnings: [
      "Raiffeisen reagiert sensibel auf 'saubere' Gesamtpreise ohne zu viele Einzelposten. In Zukunft: Bundle-Paket als Default.",
      "Antwort innerhalb von 12 Std -> positive Korrelation mit Close-Rate (3. Mal in Folge).",
      "Verhandlung war minimal (1 Runde). Nächstes Mal kann ISQ7 Frühstück-Inklusive direkt vorschlagen.",
    ],
  },
  {
    id: "a2", co: "Red Bull GmbH", from: "Max Feichtinger", email: "max.feichtinger@redbull.com", summary: "55 Zimmer · Team-Event · 14.-15. März",
    value: 18200, offered: 18200, outcome: "won", sent: "10. März 2026", replied: "4h", handledBy: "Sarah Klein",
    brief: "Internes Team-Event, 55 Zimmer, ein Abendessen, kein Konferenzraum.",
    timeline: [
      { t: "09. März 11:17", kind: "in", label: "Anfrage empfangen (über Marketing-Team, informell)" },
      { t: "09. März 11:17", kind: "ai", label: "Parsed · Leisure/Incentive · 94% Confidence" },
      { t: "10. März 08:15", kind: "send", label: "Angebot gesendet · € 18.200" },
      { t: "10. März 12:11", kind: "won", label: "Sofortige Zusage · 'Passt, wir buchen.'" },
    ],
    learnings: [
      "Informelle Anfrage -> informeller Ton in der Antwort + transaktionaler Flow funktioniert sehr gut bei Red Bull.",
      "Zusage innerhalb 7 Min nach Öffnen. Hohe Intent-Signal bei kurzen Antworten.",
    ],
  },
  {
    id: "a3", co: "Austrian Airlines", from: "Petra Hofer", email: "petra.hofer@austrian.com", summary: "12 Zimmer · Crew-Übernachtung · laufend",
    value: 4320, offered: 4320, outcome: "recurring", sent: "08. März 2026", replied: "< 1h", handledBy: "ISQ7 (vollautomatisch)",
    brief: "Monatliche Crew-Slots, 12 Zimmer pro Einsatz, Rahmenvertrag aktiv.",
    timeline: [
      { t: "08. März 05:45", kind: "in", label: "Automatische Anfrage über Airline-Portal" },
      { t: "08. März 05:45", kind: "ai", label: "Rahmenvertrag erkannt · fester Preis € 60/Zimmer" },
      { t: "08. März 05:46", kind: "send", label: "Angebot automatisch bestätigt · € 4.320" },
    ],
    learnings: [
      "Vollautomatischer Flow seit 14 Monaten ohne menschlichen Eingriff. Modell für weitere B2B-Rahmenverträge.",
      "Ø Antwortzeit: 48 Sekunden.",
    ],
  },
  {
    id: "a4", co: "Google Vienna", from: "James O'Brien", email: "james.obrien@google.com", summary: "28 Zimmer · Dev-Summit · 02.-05. März",
    value: 17900, offered: 21400, outcome: "lost", sent: "24. Februar 2026", replied: "3h", handledBy: "Andreas Bauer",
    lostReason: "Kunde ist zu Marriott gegangen (Preis)",
    brief: "Developer-Summit, 28 Zimmer, 3 Nächte, Plenum + 2 Breakouts.",
    timeline: [
      { t: "23. Feb 10:02", kind: "in", label: "RFP empfangen (Englisch)" },
      { t: "23. Feb 10:02", kind: "ai", label: "Parsed · Tech Summit · 97% · Englisch erkannt" },
      { t: "24. Feb 09:00", kind: "send", label: "Angebot gesendet · € 21.400" },
      { t: "26. Feb 14:30", kind: "nego", label: "James: 'Marriott ist bei € 19.500. Könnt ihr mit?'" },
      { t: "26. Feb 16:02", kind: "send", label: "Gegenangebot · € 20.100 mit Frühstück + Lunch-Upgrade" },
      { t: "28. Feb 11:20", kind: "lost", label: "Absage · 'Sorry, wir gehen mit Marriott.'" },
    ],
    learnings: [
      "Tech/Dev-Events: Preis-Sensitivität höher als unser Modell annahm. Marriott attackiert gezielt Tech mit -10%.",
      "ISQ7 hat die Marriott-Aktion erwähnt, aber nicht stark genug als Risiko markiert. Regel: Aktions-Flags lauter signalisieren.",
      "Ab Verhandlungsrunde 2 verliert der Deal 58% Wahrscheinlichkeit. In Zukunft: erstes Angebot näher am akzeptablen Endpreis.",
    ],
  },
  {
    id: "a5", co: "WKO Wien", from: "Mag. Elsa Bauer", email: "e.bauer@wko.at", summary: "80 Zimmer · Jahreskongress · 18.-20. Feb.",
    value: 54200, offered: 58000, outcome: "won", sent: "05. Februar 2026", replied: "1h", handledBy: "Andreas Bauer",
    brief: "Jahreskongress Wirtschaftskammer, 80 Zimmer, 2 Nächte, Großer Saal, Catering.",
    timeline: [
      { t: "03. Feb 09:14", kind: "in", label: "Anfrage empfangen" },
      { t: "03. Feb 09:14", kind: "ai", label: "Parsed · Großveranstaltung · 99% · Eskalations-Flag (>50 Zimmer)" },
      { t: "03. Feb 09:15", kind: "rev", label: "ISQ7 hat Andreas benachrichtigt (Regel: Eskalation ab 50 Zimmer)" },
      { t: "05. Feb 10:00", kind: "send", label: "Angebot gesendet · € 58.000" },
      { t: "05. Feb 11:02", kind: "nego", label: "Elsa verhandelt · '€ 54.200 ist das Budget.'" },
      { t: "05. Feb 15:00", kind: "send", label: "Revidiertes Angebot · € 54.200" },
      { t: "05. Feb 15:14", kind: "won", label: "Zusage + Anzahlung angefragt" },
    ],
    learnings: [
      "Escalation-Regel (>50 Zimmer) hat sauber funktioniert.",
      "Bei öffentlich-rechtlichen Institutionen zuerst Budget erfragen statt Listenpreis zu senden.",
      "Deal-Marge: 18% nach Revision. Liegt im Zielkorridor.",
    ],
  },
  {
    id: "a6", co: "ÖBB", from: "Wolfgang Mayer", email: "w.mayer@oebb.at", summary: "20 Zimmer · Schulung · 27. Februar",
    value: 6890, offered: 6890, outcome: "won", sent: "22. Februar 2026", replied: "6h", handledBy: "Sarah Klein",
    brief: "Interne Schulung, 20 Zimmer, 1 Nacht, Tagung.",
    timeline: [
      { t: "21. Feb 14:10", kind: "in", label: "Anfrage empfangen" },
      { t: "22. Feb 08:00", kind: "send", label: "Angebot · € 6.890 (Tagungspauschale inkl.)" },
      { t: "22. Feb 14:22", kind: "won", label: "Bestätigung per E-Mail" },
    ],
    learnings: [
      "ÖBB: drittes Mal innerhalb von 6 Monaten - Pattern erkannt, könnte in Rahmenvertrag überführt werden.",
    ],
  },
  {
    id: "a7", co: "Porsche Wien", from: "Melissa Grund", email: "m.grund@porsche.at", summary: "9 Zimmer · VIP-Kundenevent · 12. Januar",
    value: 8900, offered: 8900, outcome: "won", sent: "04. Januar 2026", replied: "30 Min", handledBy: "Andreas Bauer",
    brief: "VIP-Kundenevent, 9 Suiten, Privat-Dinner.",
    timeline: [
      { t: "03. Jan 16:00", kind: "in", label: "Anfrage (persönlich, Andreas bekannt)" },
      { t: "03. Jan 16:01", kind: "ai", label: "VIP-Flag gesetzt (Regel r3: Porsche auf VIP-Liste)" },
      { t: "04. Jan 08:30", kind: "rev", label: "Andreas hat Entwurf persönlich geschrieben" },
      { t: "04. Jan 09:15", kind: "send", label: "Angebot · € 8.900 (mit persönlicher Note)" },
      { t: "04. Jan 09:45", kind: "won", label: "Direkt-Zusage via SMS" },
    ],
    learnings: [
      "VIP-Regel hat gegriffen - keine Auto-Reply, Andreas hat selbst geschrieben.",
      "Zusage per SMS statt E-Mail - Follow-Up-System hat es trotzdem verknüpft.",
    ],
  },
  {
    id: "a8", co: "PwC Österreich", from: "Julian Reiter", email: "j.reiter@pwc.com", summary: "14 Zimmer · Audit-Team · 22.-24. Januar",
    value: 7120, offered: 7120, outcome: "won", sent: "18. Januar 2026", replied: "2h", handledBy: "ISQ7 (vollautomatisch)",
    brief: "Audit-Team vor Ort beim Mandanten, 14 Zimmer, 2 Nächte.",
    timeline: [
      { t: "18. Jan 07:14", kind: "in", label: "E-Mail Anfrage" },
      { t: "18. Jan 07:15", kind: "ai", label: "Autonome Freigabe (unter € 10k Schwelle · Regel aktiv)" },
      { t: "18. Jan 07:15", kind: "send", label: "Angebot automatisch versendet · € 7.120" },
      { t: "18. Jan 09:08", kind: "won", label: "Bestätigung ohne Verhandlung" },
    ],
    learnings: [
      "Vollautomatischer Flow, Deal unter € 10k-Schwelle - genau das Szenario, für das ISQ7 gebaut wurde.",
      "1h54m vom Posteingang bis Bestätigung. 100% ISQ7-Zeitersparnis-Fall.",
    ],
  },
  {
    id: "a9", co: "Boehringer Ingelheim", from: "Dr. Tobias Klee", email: "tobias.klee@boehringer-ingelheim.com", summary: "45 Zimmer · Forschungs-Summit · Dez. '25",
    value: 31200, offered: 31200, outcome: "lost", sent: "19. Dezember 2025", replied: "4h", handledBy: "Sarah Klein", lostReason: "Unsere Verfügbarkeit zu knapp",
    brief: "Internationale Forschungs-Konferenz, 45 Zimmer, 3 Nächte.",
    timeline: [
      { t: "18. Dez 14:00", kind: "in", label: "Anfrage empfangen" },
      { t: "18. Dez 14:00", kind: "ai", label: "Parsed · 98% · Verfügbarkeits-Warnung (nur 38 von 45 Zi. verfügbar)" },
      { t: "19. Dez 10:00", kind: "send", label: "Split-Angebot gesendet · € 31.200" },
      { t: "19. Dez 14:12", kind: "lost", label: "Absage · 'Wir brauchen alle Gäste in einem Haus.'" },
    ],
    learnings: [
      "Kreatives Split-Angebot war nicht passend für Forschungs-Gruppe (Networking-Fokus).",
      "Regel-Vorschlag: bei >40 Zimmern und <90% Verfügbarkeit sofort absagen statt Split vorschlagen.",
    ],
  },
  {
    id: "a10", co: "Deloitte Austria", from: "Clara Fuchs", email: "clara.fuchs@deloitte.com", summary: "16 Zimmer · Partner-Meeting · 30. Januar",
    value: 9600, offered: 9600, outcome: "lost", sent: "24. Januar 2026", replied: "8h", handledBy: "Andreas Bauer", lostReason: "Kunde verschoben auf Q3",
    brief: "Partner-Meeting, 16 Zimmer, 1 Nacht, Working Session.",
    timeline: [
      { t: "23. Jan 10:00", kind: "in", label: "Anfrage" },
      { t: "24. Jan 08:00", kind: "send", label: "Angebot gesendet · € 9.600" },
      { t: "28. Jan 09:30", kind: "lost", label: "Absage · interne Verschiebung auf Q3 2026" },
    ],
    learnings: [
      "Kein qualitativer Lost - reine Terminverschiebung.",
      "Clara Fuchs ist als warmer Kontakt markiert - nächste Anfrage bekommt Priority-Handling.",
    ],
  },
];

const DEFAULT_RULES = [
  { id: "r1", cat: "Autorität", text: "Rabatte bis 15% darfst du autonom geben. Darüber brauchst du eine Freigabe vom General Manager." },
  { id: "r2", cat: "Autorität", text: "Angebote bis € 10.000 darfst du vollautomatisch versenden - wenn keine andere Regel greift und Kunde in gutem Standing ist." },
  { id: "r3", cat: "VIP", text: "VIP-Kunden bekommen NIE eine automatische Antwort. ISQ7 bereitet nur einen Entwurf vor, den ich persönlich freigebe. VIP sind: (a) alle mit >5 Buchungen und LTV > € 100.000, (b) die Wiener Philharmoniker, (c) Porsche, (d) jede Anfrage mit 'Protokoll' oder 'VIP' im Betreff." },
  { id: "r4", cat: "Eskalation", text: "Bei Anfragen über 60 Personen oder mehr als 50 Zimmer immer den Sales Manager einbinden - auch wenn die Preis-Logik passt." },
  { id: "r5", cat: "Kontext", text: "Wenn die Anfrage in einer anderen Sprache kommt, antworte in derselben Sprache." },
  { id: "r6", cat: "Kontext", text: "Bei Kunden mit Rahmenvertrag den vereinbarten Preis verwenden. Keine Verhandlung, keine Rabatt-Logik - direkt bestätigen." },
  { id: "r7", cat: "Ton", text: "Schreibe freundlich, aber nie umgangssprachlich. Keine Emojis." },
  { id: "r8", cat: "Event", text: "Während der Wiener Festwochen (15. Mai - 15. Juni) nie unter € 165 pro Zimmer gehen." },
  { id: "r9", cat: "Event", text: "Zwischen 27. 12. und 02. 01. (Silvester/Neujahrskonzert) ist Peak-Season: Markt-Preis +40-80%. Stammkunden-Rabatte gelten trotzdem." },
];
const CATS = ["Autorität", "VIP", "Eskalation", "Kontext", "Ton", "Event"];
const CAT_HINTS = {
  "Autorität": "z.B.: Rabatte bis 10% darfst du autonom geben.",
  "VIP": "z.B.: VIP-Anfragen bekommen nie eine Auto-Reply, nur einen Entwurf.",
  "Eskalation": "z.B.: Bei Anfragen über 50 Zimmern immer Sales-Manager einbinden.",
  "Kontext": "z.B.: Antworte immer in der Sprache der Anfrage.",
  "Ton": "z.B.: Keine Emojis. Freundlich, aber nicht umgangssprachlich.",
  "Event": "z.B.: Während der Wiener Festwochen nie unter € 165 pro Zimmer.",
};

// Rate Shopping - market-wide competitor snapshot + events (NOT inquiry-specific)
const DEFAULT_COMPETITORS = [
  { id: "c1", n: "Novum Hotel Kavalier", stars: 3, dist: "4.2 km", base: 95, today: 98, w7: -2, w30: +4, col: "var(--accent)", enabled: true },
  { id: "c2", n: "the niu Franz (Holiday Inn)", stars: 4, dist: "2.1 km", base: 109, today: 115, w7: +4, w30: +8, col: "var(--green)", enabled: true },
  { id: "c3", n: "Mercure Vienna City Center", stars: 4, dist: "1.8 km", base: 115, today: 119, w7: +3, w30: +5, col: "var(--gold)", enabled: true },
  { id: "c4", n: "NH Wien City", stars: 4, dist: "0.9 km", base: 125, today: 135, w7: +12, w30: +18, col: "var(--purple)", enabled: true },
  { id: "c5", n: "Austria Trend Hotel Anatol", stars: 4, dist: "2.6 km", base: 119, today: 129, w7: +8, w30: +11, col: "var(--pink)", enabled: true },
];
const COMP_COLORS = ["var(--accent)", "var(--green)", "var(--gold)", "var(--purple)", "var(--pink)", "var(--red)", "var(--vip)"];

const UPCOMING_EVENTS = [
  { date: "13.-16. April", name: "Vienna Medical Congress", pax: "700.000+", impact: "+15-25%", type: "Messe/Kongress", col: "var(--red)", days: 2 },
  { date: "02.-05. Mai", name: "Coffee & Bakery Expo", pax: "25.000", impact: "+5-10%", type: "B2B-Messe", col: "var(--accent)", days: 10 },
  { date: "15. Mai - 15. Juni", name: "Wiener Festwochen", pax: "1M+", impact: "+20-35%", type: "Kultur", col: "var(--gold)", days: 24 },
  { date: "02.-05. Juni", name: "Ars Electronica Preview Week", pax: "40.000", impact: "+10-15%", type: "Kultur/Tech", col: "var(--purple)", days: 42 },
  { date: "01.-06. Juli", name: "ImPulsTanz Festival", pax: "80.000", impact: "+15%", type: "Kultur", col: "var(--pink)", days: 71 },
  { date: "30.12.-02.01.", name: "Neujahrskonzert / Silvester", pax: "500.000+", impact: "+60-80%", type: "Peak-Event", col: "var(--red)", days: 253 },
];

const AI_ACTIVITY_FEED = [
  { time: "10:16", text: "BMW Wien · Markt-Analyse gestartet (4 Competitors)", col: "var(--gold)" },
  { time: "10:15", text: "BMW Wien · Anfrage geparsed in 1.8s (Leisure Incentive)", col: "var(--green)" },
  { time: "10:01", text: "Siemens AG · Angebot zur Review vorgelegt", col: "var(--purple)" },
  { time: "09:38", text: "Verbund AG · Eskalations-Flag (Großveranstaltung)", col: "var(--red)" },
  { time: "09:23", text: "OMV AG · Anfrage parsed, Corp-Rate erkannt (€ 99-119)", col: "var(--green)" },
  { time: "09:23", text: "OMV AG · Auto-Reply gesendet (47s nach Eingang)", col: "var(--accent)" },
  { time: "07:42", text: "Wiener Philharmoniker · VIP-Flag (Regel r3), Auto-Reply unterdrückt", col: "var(--vip)" },
];

// =========================================================================
// UTILITIES
// =========================================================================

const fmt = (n) => "€ " + Math.round(n).toLocaleString("de-DE");
const total = (q) => q.lines.reduce((s, l) => s + l.v, 0);
const summary = (q, lang) => (lang === "en" && q.summaryEn) ? q.summaryEn : q.summary;
const intent = (q, lang) => (lang === "en" && q.intentEn) ? q.intentEn : q.intent;
const eventPill = (ev, lang) => (lang === "en" && ev.pillEn) ? ev.pillEn : ev.pill;
const eventName = (ev, lang) => (lang === "en" && ev.nameEn) ? ev.nameEn : ev.name;
const eventBody = (ev, lang) => (lang === "en" && ev.bodyEn) ? ev.bodyEn : ev.body;
const tag = (q, t) => { const map = { Neu: t("tag_new"), Bepreist: t("tag_priced"), Gesendet: t("tag_sent"), VIP: t("tag_vip") }; return map[q.tag] || q.tag; };

const Bdg = ({ text, col, size = "md" }) => (
  <span className={"bdg" + (size === "sm" ? " sm" : "")} style={{ color: col, background: `color-mix(in srgb, ${col} 12%, transparent)` }}>{text}</span>
);

const TONE_COL = {
  gold: "var(--gold)", accent: "var(--accent)", green: "var(--green)", red: "var(--red)", purple: "var(--purple)", vip: "var(--vip)", pink: "var(--pink)",
};

// =========================================================================
// SHELL
// =========================================================================

const Sidebar = ({ active, onNav, openCount }) => {
  const t = useT();
  const items = [
    { k: "inbox", label: t("nav_inquiries"), badge: openCount },
    { k: "rates", label: t("nav_monitor") },
    { k: "analytics", label: t("nav_analytics") },
    { k: "archive", label: t("nav_archive") },
    { k: "settings", label: t("nav_settings") },
  ];
  return (
    <aside className="sidebar">
      <div className="logo-block">
        <div className="logo-mark">7</div>
        <div className="logo-name">isq7</div>
      </div>
      {items.map((it) => (
        <button key={it.k} className={"nav-item " + (active === it.k ? "active" : "")} onClick={() => onNav(it.k)}>
          <span style={{ flex: 1 }}>{it.label}</span>
          {it.badge ? <span className="badge">{it.badge}</span> : null}
        </button>
      ))}
      <div className="hotel-meta">
        <div className="name">The Lakeview Vienna</div>
        <div className="group">Grandview Hotel Group</div>
      </div>
    </aside>
  );
};

const TopBar = ({ title, subtitle, live, onBack, lang, setLang }) => {
  const t = useT();
  return (
    <div className="topbar">
      <div className="title">
        {onBack && <button className="btn-ghost" onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 18 }}>{"←"}</span>{t("back")}
        </button>}
        <h1>{title}</h1>
        {subtitle && <div className="sub">{subtitle}</div>}
        {live && <div className="live-dot"><div className="d" /><span>LIVE</span></div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 8, padding: 2 }}>
          {["de", "en"].map(l => (
            <button key={l} onClick={() => setLang(l)}
              style={{ padding: "6px 12px", fontSize: 12, fontWeight: 700, borderRadius: 6, background: lang === l ? "rgba(196,160,60,0.15)" : "transparent", color: lang === l ? "var(--gold)" : "var(--text-muted)", letterSpacing: 1, cursor: "pointer", fontFamily: "var(--font-m)" }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="avatar">AB</div>
      </div>
    </div>
  );
};

// =========================================================================
// INBOX
// =========================================================================

const Inbox = ({ inquiries, go }) => {
  const t = useT();
  const { lang } = useLang();
  const visible = ORDER.filter(id => inquiries[id]);
  const count = visible.filter(id => inquiries[id].status !== "sent").length;
  return (
    <div className="fade-in">
      <div className="page-head">
        <div className="eyebrow">{t("inbox_greeting")}</div>
        <h1 className="page-title">{t("inbox_headline_tpl", { n: count })}</h1>
        <p className="page-lede">{t("inbox_lede")}</p>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="inq-header">
          <div>{t("inbox_client")}</div><div>{t("inbox_subject")}</div><div>{t("inbox_status")}</div><div>{t("inbox_volume")}</div><div>{t("inbox_inbound")}</div><div/>
        </div>
        {visible.map(id => {
          const q = inquiries[id];
          const next = "inquiry"; // always go to thread - user can navigate to sent from there
          return (
            <div key={id} className={"inq-row " + (q.vip ? "vip" : "")} onClick={() => go(next, id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="avatar-sm">{q.co.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div className="co">{q.co}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{q.from}</div>
                </div>
              </div>
              <div className="subj">{summary(q, lang)}</div>
              <div><Bdg text={tag(q, t)} col={TONE_COL[q.tone]} size="sm" /></div>
              <div className="rev">{fmt(total(q))}</div>
              <div className="t">{lang === "en" && q.receivedAtEn ? q.receivedAtEn : q.receivedAt}</div>
              <div className="arrow">{"›"}</div>
            </div>
          );
        })}
      </div>

      <div className="card mt-24 glow-accent" style={{ padding: 24 }}>
        <div className="section-head">
          <h3>{t("inbox_ai_activity")}</h3>
          <div className="live-dot"><div className="d" /><span>{t("live")}</span></div>
        </div>
        <div className="activity-feed">
          {AI_ACTIVITY_FEED.map((a, i) => (
            <div key={i} className="activity-event">
              <div className="t">{a.time}</div>
              <div className="spine" style={{ color: a.col, background: a.col }} />
              <div className="text">{a.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// INQUIRY DETAIL
// =========================================================================

const InquirySteps = ({ q }) => {
  const t = useT(); const { lang } = useLang();
  const [open, setOpen] = useState(null);
  const L = lang === "en";
  const baseSteps = [
    { id: "read", agent: "EMAIL", badgeCls: "email", color: "var(--accent)", time: "09:23:00", sublabel: L ? "Incoming" : "Eingehend", label: L ? `Language ${q.language} + intent "${intent(q, lang)}" detected (${q.confidence})` : `Sprache ${q.language} + Intent "${intent(q, lang)}" erkannt (${q.confidence})`, kind: "email-in" },
    { id: "extract", agent: "ISQ7", badgeCls: "ai", color: "var(--green)", time: "09:23:02", sublabel: L ? "Parsed (2.3s)" : "Geparsed (2.3s)", label: t("step_extract"), kind: "extract" },
  ];
  const replyStep = q.vip
    ? { id: "reply", agent: "VIP", badgeCls: "vip", color: "var(--vip)", time: "09:23:03", sublabel: L ? "Rule r3 triggered" : "Regel r3 aktiv", label: t("step_vip_no_reply"), kind: "email-out-vip" }
    : { id: "reply", agent: "ISQ7", badgeCls: "system", color: "var(--accent)", time: "09:23:47", sublabel: L ? "Auto-Reply sent" : "Auto-Reply gesendet", label: t("step_auto_reply"), kind: "email-out" };
  const steps = [
    ...baseSteps, replyStep,
    { id: "market", agent: "ISQ7", badgeCls: "pricing", color: "var(--gold)", time: "09:24:01", sublabel: L ? "Market analysis (8.7s)" : "Markt-Analyse (8.7s)", label: t("step_market"), kind: "market" },
    { id: "event", agent: "ISQ7", badgeCls: "pdf", color: "var(--purple)", time: "09:24:10", sublabel: L ? "Event detected" : "Event erkannt", label: eventName(q.event, lang), kind: "event" },
    { id: "pdf", agent: "ISQ7", badgeCls: "pdf", color: "var(--purple)", time: "09:24:11", sublabel: L ? "Proposal ready" : "Angebot bereit", label: `${q.proposalId || "ANG-2026-0342"}.pdf ${L ? "ready for review" : "wartet auf Freigabe"} (${fmt(total(q))})`, kind: "extract" },
    { id: "wait", agent: "STATUS", badgeCls: "status", color: "var(--gold)", time: "09:24:12", sublabel: L ? "Awaiting human" : "Wartet auf Mensch", label: L ? "Proposal queued for review. Notification sent to revenue manager." : "Angebot wartet auf Review. Revenue Manager wurde benachrichtigt.", kind: null },
  ];
  // Append persisted audit log + chat history as timeline events
  (q.auditLog || []).forEach((entry, idx) => {
    if (entry.action === "adjusted") {
      steps.push({ id: "adj-me-" + idx, agent: entry.by ? entry.by.split(" ")[0].toUpperCase() : "ANDREAS", badgeCls: "status", color: "var(--accent)", time: entry.at, sublabel: L ? "Suggested change" : "Änderung vorgeschlagen", label: entry.userText || entry.details, kind: null });
      steps.push({ id: "adj-ai-" + idx, agent: "ISQ7", badgeCls: "ai", color: "var(--green)", time: entry.at, sublabel: L ? "Applied" : "Angewendet", label: entry.details, kind: null });
    } else if (entry.action === "approved") {
      steps.push({ id: "appr-" + idx, agent: entry.by ? entry.by.split(" ")[0].toUpperCase() : "ANDREAS", badgeCls: "ai", color: "var(--green)", time: entry.at, sublabel: L ? "Approved & sent" : "Freigegeben & gesendet", label: entry.details, kind: null });
    }
  });
  return (
    <div className="vtl">
      {steps.map((s, i) => {
        const isOpen = open === s.id;
        const delay = (0.05 + i * 0.08) + "s";
        return (
          <div key={s.id} className="vtl-event" style={{ animationDelay: delay }}>
            <div className="vtl-time">{s.time}</div>
            <div className="vtl-spine" style={{ color: s.color, background: s.color }} />
            <div className={"vtl-card" + (isOpen ? " expanded" : "")} onClick={() => s.kind && setOpen(isOpen ? null : s.id)} style={s.kind ? {} : { cursor: "default" }}>
              {s.kind && <span className="vtl-expand-icon">{"›"}</span>}
              <div className="vtl-card-head">
                <span className={"agent-badge " + s.badgeCls}>{s.agent}</span>
                <span className="vtl-card-sublabel">{s.sublabel}</span>
              </div>
              <div className="vtl-card-body">{s.label}</div>
              {isOpen && s.kind && <div className="vtl-card-detail fade-in"><StepDetail step={s} q={q} /></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StepDetail = ({ step, q }) => {
  const t = useT(); const { lang } = useLang();
  const k = step.kind;
  if (k === "email-in") return (
    <div>
      <div className="email-head">
        <span className="l">{t("inquiry_from")}</span><span>{q.from} &lt;{q.email}&gt;</span>
        <span className="l">{t("email_to")}</span><span>groups@lakeview-vienna.at</span>
        <span className="l">{t("email_subject")}</span><span>{q.emailSubject}</span>
        <span className="l">{t("email_received")}</span><span className="mono">{lang === "en" && q.receivedAtEn ? q.receivedAtEn : q.receivedAt}</span>
      </div>
      <div className="email-body">{q.emailBody}</div>
    </div>
  );
  if (k === "extract") {
    const fields = (lang === "en" && q.extractEn) ? q.extractEn : q.extract;
    return (
      <div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 2, marginBottom: 10, fontWeight: 700 }}>{t("extracted_fields")}</div>
        {fields.map(([kk, vv]) => (<div className="kv" key={kk}><span className="k">{kk}</span><span className="v">{vv}</span></div>))}
      </div>
    );
  }
  if (k === "email-out") {
    const isMale = !!q.from.match(/^(Markus|Andreas|Dr\. Andreas)/);
    const lastName = q.from.split(" ").slice(-1)[0];
    const salute = lang === "en" ? (isMale ? "Mr." : "Ms.") : (isMale ? "r Herr" : " Frau");
    return (
      <div>
        <div className="email-head">
          <span className="l">{t("inquiry_from")}</span><span>groups@lakeview-vienna.at</span>
          <span className="l">{t("email_to")}</span><span>{q.email}</span>
          <span className="l">{t("email_subject")}</span><span>Re: {q.emailSubject}</span>
          <span className="l">{t("email_sent")}</span><span className="mono">{t("auto_reply_47s")}</span>
        </div>
        <div className="email-body">{t("auto_reply_body_tpl", { salute, name: lastName })}</div>
      </div>
    );
  }
  if (k === "email-out-vip") return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Bdg text={t("vip_mode_active")} col="var(--vip)" size="sm" />
        <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{t("vip_no_autoreply")}</span>
      </div>
      <div style={{ color: "var(--text-sub)", fontSize: 13, lineHeight: 1.6 }}>{t("vip_draft_prepared")}</div>
    </div>
  );
  if (k === "market") {
    const maxP = Math.max(...q.market.map(m => m.p));
    return (
      <div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 2, marginBottom: 10, fontWeight: 700 }}>{t("live_rates_vienna")} · {q.event.dates}</div>
        {q.market.map(m => (
          <div key={m.n} style={{ display: "grid", gridTemplateColumns: "1.4fr 2fr auto", gap: 14, alignItems: "center", padding: "6px 0" }}>
            <span style={{ fontSize: 13 }}>{m.n}</span>
            <span style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
              <span style={{ display: "block", height: "100%", width: `${(m.p / maxP) * 100}%`, background: "var(--gold)", borderRadius: 3 }} />
            </span>
            <span className="mono" style={{ fontSize: 13, fontWeight: 700, minWidth: 60, textAlign: "right" }}>{fmt(m.p)}</span>
          </div>
        ))}
        <div style={{ marginTop: 10, fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-m)" }}>{t("rate_source")}</div>
      </div>
    );
  }
  if (k === "event") return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Bdg text={eventPill(q.event, lang)} col={TONE_COL[q.event.tone]} size="sm" />
        <span className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{q.event.dates}</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{eventName(q.event, lang)}</div>
      <div style={{ color: "var(--text-sub)", fontSize: 13, lineHeight: 1.55 }}>{eventBody(q.event, lang)}</div>
    </div>
  );
  return null;
};

const CustomerMemory = ({ q }) => {
  const t = useT();
  const m = MEMORY[q.id];
  if (!m) return null;
  return <CustomerMemoryInner q={q} m={m} t={t} />;
};
const CustomerMemoryInner = ({ q, m, t }) => {
  const [open, setOpen] = useState(false);
  if (m.bookings === 0) {
    return (
      <div className="card mt-16">
        <div className="section-head">
          <h3>{t("customer_profile")}</h3><span className="note">{t("new_customer")}</span>
        </div>
        <div className="memory-empty">
          <div className="new-badge">{t("new_badge")}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{t("no_history")}</div>
            <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.55 }}>{m.notes}</div>
          </div>
        </div>
        <div className="ai-reason">
          <div className="ai-reason-head">✦ {t("how_ai_handles")}</div>
          <div className="ai-reason-body">{m.aiReasoning}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="card mt-16">
      <div className="section-head">
        <h3>{t("customer_profile")}</h3>
        <span className="note">{m.rating === "A+" ? t("key_customer") : t("regular_customer")} {t("since")} {m.since}</span>
      </div>
      <div className="memory-stats">
        <div><div className="l">{t("bookings")}</div><div className="v mono">{m.bookings}</div></div>
        <div><div className="l">{t("avg_discount")}</div><div className="v mono">{m.avgDiscount}%</div></div>
        <div><div className="l">{t("lifetime_value")}</div><div className="v mono">{fmt(m.lifetimeValue)}</div></div>
        <div><div className="l">{t("rating")}</div><div className="v"><Bdg text={m.rating} col="var(--gold)" /></div></div>
      </div>
      <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.55, marginTop: 12 }}>{m.notes}</div>
      <div className="ai-reason">
        <div className="ai-reason-head">✦ {t("why_discount_logic")}</div>
        <div className="ai-reason-body">{m.aiReasoning}</div>
      </div>
      <button className="btn btn-sm mt-16" onClick={() => setOpen(!open)}>
        <span style={{ display: "inline-block", transition: "transform .2s", transform: open ? "rotate(90deg)" : "rotate(0)" }}>{"›"}</span>
        {t("booking_history")} ({m.history.length})
      </button>
      {open && (
        <div className="mt-16 fade-in">
          <div style={{ display: "grid", gridTemplateColumns: "100px 1.5fr 80px 110px 1.5fr", gap: 12, padding: "8px 0", fontSize: 11, color: "var(--text-muted)", letterSpacing: 2, fontWeight: 700, borderBottom: "1px solid var(--border)" }}>
            <span>{t("hist_when")}</span><span>{t("hist_what")}</span><span>{t("hist_rate")}</span><span>{t("hist_discount")}</span><span>{t("hist_reason")}</span>
          </div>
          {m.history.map((h, i) => (
            <div className="hist-row" key={i}>
              <span className="when">{h.when}</span>
              <span>{h.what}</span>
              <span className="mono txt-muted">{fmt(h.rate)}/N</span>
              <span><Bdg text={h.disc > 0 ? `-${h.disc}%` : t("no_discount")} col={h.disc > 0 ? "var(--gold)" : "var(--text-muted)"} size="sm" /></span>
              <span className="reason">{h.reason}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const VIPDraftReply = ({ q, updateInquiry }) => {
  const t = useT();
  const [draft, setDraft] = useState(q.draftReply || "");
  const [sent, setSent] = useState(false);
  return (
    <div className="card mt-16" style={{ borderColor: "rgba(251,191,36,0.25)" }}>
      <div className="section-head">
        <h3>{t("vip_draft_title")}</h3>
        <Bdg text={"VIP · " + t("vip_no_autoreply").split(".")[0]} col="var(--vip)" size="sm" />
      </div>
      <div style={{ color: "var(--text-sub)", fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
        {t("vip_draft_desc")}
      </div>
      <textarea className="ta" rows={11} value={draft} onChange={e => setDraft(e.target.value)} />
      <div className="flex gap-12 mt-16">
        <button className="btn btn-primary flex-1" onClick={() => setSent(true)} disabled={sent} style={{ justifyContent: "center" }}>
          {sent ? t("vip_draft_sent") : t("vip_send_draft")}
        </button>
        <button className="btn">{t("vip_have_ai_adjust")}</button>
      </div>
      {sent && <div style={{ marginTop: 12, fontSize: 13, color: "var(--green)", textAlign: "center" }}>{t("vip_sent_to_tpl", { email: q.email })}</div>}
    </div>
  );
};

const Inquiry = ({ q, go, updateInquiry }) => {
  const t = useT(); const { lang } = useLang();
  const recvd = lang === "en" && q.receivedAtEn ? q.receivedAtEn : q.receivedAt;
  const urg = lang === "en" && q.urgencyEn ? q.urgencyEn : q.urgency;
  const hint = lang === "en" && q.rateHintEn ? q.rateHintEn : q.rateHint;
  return (
    <div className="fade-in">
      <div className="page-head">
        <div className="eyebrow">{q.vip ? t("inquiry_label_vip") : t("inquiry_label")} · {q.co}</div>
        <h1 className="page-title">{summary(q, lang)}</h1>
        <p className="page-lede">{t("inquiry_from")} {q.from} · {t("inquiry_received")} {recvd} · {urg}.</p>
      </div>

      {q.vip && (
        <div className="vip-banner">
          <div className="dot" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{t("vip_rule_triggered")}</div>
            <div style={{ color: "var(--text-sub)", fontSize: 13, lineHeight: 1.55 }}>{t("vip_rule_body").replace(/<\/?b>/g, "")}</div>
          </div>
        </div>
      )}

      {q.status === "sent" && (
        <div className="card mb-16" style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, borderLeft: "3px solid var(--green)", borderColor: "rgba(34,197,94,0.25)", background: "rgba(34,197,94,0.04)" }}>
          <div style={{ fontSize: 20, color: "var(--green)" }}>✓</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--green)" }}>{lang === "en" ? "Proposal sent" : "Angebot gesendet"}</div>
            <div style={{ fontSize: 12, color: "var(--text-sub)" }}>{lang === "en" ? "by" : "von"} {q.sentBy || "Andreas Bauer"} · {q.sentAt || "-"}</div>
          </div>
          <button className="btn btn-sm" onClick={() => go("sent", q.id)}>{lang === "en" ? "View sent details" : "Sent-Ansicht öffnen"} {"→"}</button>
        </div>
      )}

      <div className="card">
        <div className="section-head">
          <h3>{t("ai_did_in_47s")}</h3>
        </div>
        <InquirySteps q={q} />
      </div>

      {q.vip && <VIPDraftReply q={q} updateInquiry={updateInquiry} />}

      <CustomerMemory q={q} />

      <div className="proposal-ready mt-16" style={{ textAlign: "center" }}>
        <div className="proposal-ready-head">{t("recommended_total")}</div>
        <div style={{ fontSize: 56, fontWeight: 900, margin: "4px 0 6px", color: "var(--text)", fontFamily: "var(--font-m)", letterSpacing: "-1px" }}>{fmt(total(q))}</div>
        <div className="proposal-ready-formula">{fmt(q.rate)} {hint}</div>
        <button className="btn btn-primary mt-24" onClick={() => go("price", q.id)}>
          {t("review_proposal")} {"→"}
        </button>
      </div>
    </div>
  );
};

// =========================================================================
// PRICING
// =========================================================================

const Pricing = ({ q, go, updateInquiry }) => {
  const t = useT(); const { lang } = useLang();
  const [sending, setSending] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [chat, setChat] = useState(() => {
    const existing = [];
    (q.auditLog || []).forEach(e => {
      if (e.action === "adjusted") {
        if (e.userText) existing.push({ role: "me", text: e.userText });
        if (e.details) existing.push({ role: "ai", text: e.details });
      }
    });
    return existing;
  });
  const [input, setInput] = useState("");
  const maxP = Math.max(...q.market.map(m => m.p), q.rate);

  const approve = () => {
    if (sending) return;
    setSending(true);
    const now = new Date().toLocaleTimeString(lang === "en" ? "en-US" : "de-DE", { hour: "2-digit", minute: "2-digit" });
    const approvalEntry = { action: "approved", by: "Andreas Bauer", at: now, details: (lang === "en" ? "Approved at " : "Freigegeben bei ") + fmt(total(q)) };
    setTimeout(() => {
      updateInquiry(q.id, {
        status: "sent", tag: "Gesendet", tone: "green", sentAt: lang === "en" ? "Just now" : "Gerade eben", sentBy: "Andreas Bauer",
        auditLog: [...(q.auditLog || []), approvalEntry],
        followUps: [
          { at: "T+0", label: lang === "en" ? "Proposal sent via E-Response" : "Angebot gesendet per E-Response", done: true },
          { at: "T+4h", label: lang === "en" ? "Open receipt expected" : "Öffnungsbestätigung erwartet", done: false },
          { at: "T+24h", label: lang === "en" ? "Automatic reminder" : "Automatische Erinnerung", done: false },
          { at: "T+72h", label: lang === "en" ? "Escalation to Sales Manager" : "Eskalation an Sales-Manager", done: false },
        ],
      });
      go("sent");
    }, 900);
  };

  const applyAdjust = (userText) => {
    const text = (userText || input).trim();
    if (!text) return;
    const newChat = [...chat, { role: "me", text }];
    setInput("");
    const parsed = localAdjust(text, q);
    const now = new Date().toLocaleTimeString(lang === "en" ? "en-US" : "de-DE", { hour: "2-digit", minute: "2-digit" });
    if (parsed && parsed.lines) {
      setChat([...newChat, { role: "ai", text: parsed.explanation }]);
      const adjustEntry = { action: "adjusted", by: "Andreas Bauer", at: now, userText: text, details: parsed.explanation };
      updateInquiry(q.id, {
        lines: parsed.lines, rate: parsed.rate || q.rate,
        auditLog: [...(q.auditLog || []), adjustEntry],
      });
    } else {
      setChat([...newChat, { role: "ai", text: t("adjust_error"), error: true }]);
    }
  };

  const suggestions = [t("sugg_discount"), t("sugg_breakfast"), t("sugg_premium"), t("sugg_deadline")];

  return (
    <div className="fade-in">
      <div className="page-head">
        <div className="eyebrow">{t("pricing_label")} · {q.co}</div>
        <h1 className="page-title">{t("pricing_title_tpl", { rate: fmt(q.rate) })}</h1>
        <p className="page-lede">{t("pricing_lede")}</p>
      </div>

      <div className="card">
        <div className="section-head">
          <h3>{t("market_rates_tpl", { dates: q.event.dates })}</h3>
          <span className="note">{t("updated_2min")}</span>
        </div>
        {q.market.map(m => (
          <div className="comp-row" key={m.n}>
            <span className="name">{m.n}</span>
            <div className="bar"><div className="fill" style={{ width: `${(m.p / maxP) * 100}%`, background: "rgba(255,255,255,0.3)" }} /></div>
            <span className="price">{fmt(m.p)}</span>
          </div>
        ))}
        <div className="comp-row ours">
          <span className="name"><b>{t("the_lakeview_you")}</b> <span className="ours-tag">●</span></span>
          <div className="bar"><div className="fill" style={{ width: `${(q.rate / maxP) * 100}%`, background: "var(--gold)" }} /></div>
          <span className="price" style={{ color: "var(--gold)" }}>{fmt(q.rate)}</span>
        </div>

        <div className="mt-16" style={{ padding: "14px 18px", background: q.event.tone === "red" ? "rgba(248,113,113,0.06)" : "rgba(96,165,250,0.05)", border: `1px solid ${TONE_COL[q.event.tone]}30`, borderRadius: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <Bdg text={eventPill(q.event, lang)} col={TONE_COL[q.event.tone]} size="sm" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{eventName(q.event, lang)}</div>
            <div style={{ fontSize: 13, color: "var(--text-sub)", marginTop: 4, lineHeight: 1.55 }}>{eventBody(q.event, lang)}</div>
          </div>
        </div>
      </div>

      <div className="proposal-ready mt-16">
        <div className="proposal-ready-head">{lang === "en" ? "ISQ7 RECOMMENDATION" : "ISQ7 EMPFEHLUNG"}</div>
        {q.lines.map((l, i) => (
          <div className="kv" key={i} style={{ borderBottomColor: "rgba(196,160,60,0.12)" }}>
            <span className="k">{l.k}</span>
            <span className="v" style={{ color: l.v < 0 ? "var(--green)" : "var(--text)" }}>{fmt(l.v)}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, marginTop: 12, borderTop: "2px solid var(--gold-muted)" }}>
          <span style={{ fontSize: 17, fontWeight: 800 }}>{t("total")}</span>
          <span style={{ fontSize: 32, fontWeight: 900, color: "var(--green)", fontFamily: "var(--font-m)", letterSpacing: "-0.5px" }}>{fmt(total(q))}</span>
        </div>
      </div>

      {adjustOpen && (
        <div className="card mt-16 fade-in">
          <div className="section-head">
            <h3>{t("adjust_with_ai")}</h3>
            <span className="note">{t("understands_freetext")}</span>
          </div>
          <div className="chat">
            {chat.length === 0 && <div className="msg ai">{t("adjust_placeholder")}</div>}
            {chat.map((m, i) => <div key={i} className={"msg " + m.role + (m.error ? " error" : "")}>{m.text}</div>)}
          </div>
          {chat.length === 0 && (
            <div className="sugg">
              {suggestions.map(s => <button key={s} onClick={() => applyAdjust(s)}>{s}</button>)}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <textarea className="ta" rows={2} value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); applyAdjust(); } }}
              placeholder={t("adjust_input_ph")} />
            <button className={"btn btn-gold" + (input.trim() ? " is-ready" : "")} onClick={() => applyAdjust()} disabled={!input.trim()}>{t("adjust_send")}</button>
          </div>
        </div>
      )}

      <div className="flex gap-12 mt-24">
        <button className="btn btn-primary flex-1" onClick={approve} disabled={sending || q.status === "sent"} style={{ justifyContent: "center", opacity: q.status === "sent" ? 0.55 : 1 }}>
          {q.status === "sent" ? (lang === "en" ? "✓ Already sent" : "✓ Bereits gesendet") : (sending ? t("sending") : t("approve_send"))}
        </button>
        <button className="btn" onClick={() => setAdjustOpen(!adjustOpen)}>
          ✦ {adjustOpen ? t("close") : t("adjust")}
        </button>
      </div>
    </div>
  );
};

function localAdjust(text, q) {
  const t = text.toLowerCase();
  const lines = [...q.lines];
  let rate = q.rate;
  const discM = t.match(/(\d+)\s*%/);
  if (discM && (t.includes("rabatt") || t.includes("discount") || t.includes("reduz"))) {
    const pct = parseInt(discM[1], 10) / 100;
    for (let i = 0; i < lines.length; i++) if (lines[i].v > 0) lines[i] = { ...lines[i], v: Math.round(lines[i].v * (1 - pct)) };
    rate = Math.round(rate * (1 - pct));
    return { lines, rate, explanation: `${discM[1]}% Rabatt auf alle Positionen angewendet. Neue Rate: € ${rate}.` };
  }
  if (t.includes("frühstück") || t.includes("breakfast")) {
    lines.push({ k: "Frühstücksbuffet", v: Math.round(q.lines[0].v * 0.15) });
    return { lines, rate, explanation: "Frühstücksbuffet ergänzt." };
  }
  if (t.includes("premium") || t.includes("upgrade")) {
    const idx = lines.findIndex(l => /f&b|lunch|dinner/i.test(l.k));
    if (idx >= 0) {
      lines[idx] = { ...lines[idx], k: lines[idx].k + " (Premium)", v: Math.round(lines[idx].v * 1.3) };
    } else {
      lines.push({ k: "Premium-Upgrade", v: 800 });
    }
    return { lines, rate, explanation: "Auf Premium-Paket aufgewertet." };
  }
  return { lines, rate, explanation: "Keine Änderung - formuliere gern anders (z.B. '10% Rabatt' oder 'Frühstück dazu')." };
}

// =========================================================================
// SENT
// =========================================================================

const Sent = ({ q, go }) => {
  const t = useT(); const { lang } = useLang();
  const steps = q.followUps || [
    { at: "T+0", label: lang === "en" ? "Proposal sent via E-Response" : "Angebot per E-Response gesendet", done: true },
    { at: "T+4h", label: lang === "en" ? "Open receipt expected" : "Öffnungsbestätigung erwartet", done: false },
    { at: "T+24h", label: lang === "en" ? "Automatic reminder" : "Automatische Erinnerung", done: false },
    { at: "T+72h", label: lang === "en" ? "Escalation to Sales Manager" : "Eskalation an Sales-Manager", done: false },
  ];
  const isMale = !!q.from.match(/^(Markus|Andreas|Dr\. Andreas)/);
  const lastName = q.from.split(" ").slice(-1)[0];
  const saluteDe = isMale ? "r Herr" : " Frau";
  const saluteEn = isMale ? "Mr." : "Ms.";
  const bodyDe = `Sehr geehrte${saluteDe} ${lastName},\n\nanbei unser Angebot für Ihre Anfrage:\n\n${q.lines.map(l => `• ${l.k}: ${fmt(l.v)}`).join("\n")}\n\nTotal: ${fmt(total(q))}\n\nDas Angebot ist gültig bis Freitag 18:00.\n\nHerzliche Grüße\nAndreas Bauer\nGroup Sales · The Lakeview Vienna`;
  const bodyEn = `Dear ${saluteEn} ${lastName},\n\nplease find our proposal for your inquiry below:\n\n${q.lines.map(l => `• ${l.k}: ${fmt(l.v)}`).join("\n")}\n\nTotal: ${fmt(total(q))}\n\nThis proposal is valid until Friday 6 PM.\n\nBest regards,\nAndreas Bauer\nGroup Sales · The Lakeview Vienna`;
  const sentAt = q.sentAt || (lang === "en" ? "just now" : "gerade eben");
  return (
    <div className="fade-in">
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div className="big-check">✓</div>
        <div className="eyebrow">{t("proposal_sent")}</div>
        <h1 className="page-title" style={{ marginTop: 6 }}>{q.co}</h1>
        <p className="page-lede" style={{ margin: "14px auto 0" }}>{t("total_sent_by_tpl", { total: fmt(total(q)), when: sentAt, who: q.sentBy || "Andreas Bauer" })}</p>
      </div>

      <div className="card">
        <div className="section-head">
          <h3>{t("email_to_tpl", { name: q.from })}</h3>
          <span className="note">{t("tracked")}</span>
        </div>
        <div className="email-head">
          <span className="l">{t("inquiry_from")}</span><span>groups@lakeview-vienna.at</span>
          <span className="l">{t("email_to")}</span><span>{q.email}</span>
          <span className="l">{t("email_subject")}</span><span>{t("your_proposal_for")} {q.emailSubject.replace(/^Anfrage:\s*/, "").replace(/^Inquiry:\s*/, "")}</span>
        </div>
        <div className="email-body" style={{ fontSize: 13 }}>{lang === "en" ? bodyEn : bodyDe}</div>
      </div>

      <div className="card mt-16">
        <div className="section-head">
          <h3>{t("follow_up_plan")}</h3>
          <span className="note">{t("ai_orchestrated")}</span>
        </div>
        {steps.map((s, i) => (
          <div key={i} className="step-v" style={{ cursor: "default" }}>
            <div className={"check" + (s.done ? "" : " pending")}>{s.done ? "✓" : i + 1}</div>
            <div className="label">{s.label}</div>
            <span className="time">{s.at}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-12 mt-24" style={{ justifyContent: "center" }}>
        <button className="btn" onClick={() => go("inbox")}>{t("back_to_inbox")}</button>
        <button className="btn btn-primary" onClick={() => go("analytics")}>{t("view_analytics")} {"→"}</button>
      </div>
    </div>
  );
};

// =========================================================================
// RATE SHOPPING (market-wide, not inquiry-specific)
// =========================================================================

const CompetitorEditor = ({ competitors, toggle, remove, add, update, reset, lang }) => {
  const [draft, setDraft] = useState({ n: "", stars: 4, dist: "", base: 119 });
  const valid = draft.n.trim().length > 2 && draft.base > 0;
  const submit = () => {
    if (!valid) return;
    add({ n: draft.n.trim(), stars: Number(draft.stars), dist: draft.dist.trim() || "-", base: Number(draft.base) });
    setDraft({ n: "", stars: 4, dist: "", base: 119 });
  };
  const L = lang === "en";
  return (
    <div className="card fade-in" style={{ padding: 18, marginBottom: 10, background: "var(--bg-elev)", borderColor: "var(--gold-muted)" }}>
      <div style={{ fontSize: 12, color: "var(--gold)", letterSpacing: 2, fontWeight: 700, marginBottom: 12 }}>
        {L ? "COMPETITOR SET CONFIGURATION" : "WETTBEWERBER-AUSWAHL"}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-sub)", lineHeight: 1.55, marginBottom: 14 }}>
        {L
          ? "Which hotels should ISQ7 monitor? Toggle to activate, remove to delete, or add new ones. Your AI insights use only active competitors."
          : "Welche Hotels soll ISQ7 beobachten? Ein/aus-Toggle aktiviert, Kreuz entfernt, unten kannst du neue hinzufügen. Deine KI-Analyse nutzt nur aktive Wettbewerber."}
      </div>

      {/* Existing list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {competitors.map(c => (
          <div key={c.id} style={{ display: "grid", gridTemplateColumns: "auto 1.8fr 0.6fr 0.8fr 0.8fr auto", gap: 10, alignItems: "center", padding: "10px 12px", background: c.enabled ? "rgba(255,255,255,0.03)" : "transparent", border: "1px solid var(--border)", borderRadius: 10, opacity: c.enabled ? 1 : 0.5 }}>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" checked={c.enabled} onChange={() => toggle(c.id)} style={{ width: 16, height: 16, accentColor: "var(--gold)", cursor: "pointer" }} />
            </label>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{c.n}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2, fontFamily: "var(--font-m)" }}>{c.stars}★ · {c.dist}</div>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {L ? "Base" : "Basis"}
              <div className="mono" style={{ color: "var(--text)", fontSize: 14 }}>€ {c.base}</div>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {L ? "Today" : "Heute"}
              <div className="mono" style={{ color: "var(--gold)", fontSize: 14 }}>€ {c.today}</div>
            </div>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.col }} />
            <button onClick={() => remove(c.id)} title={L ? "Remove" : "Entfernen"} style={{ background: "transparent", border: 0, color: "var(--text-muted)", fontSize: 20, cursor: "pointer", padding: "2px 8px", lineHeight: 1 }}>×</button>
          </div>
        ))}
      </div>

      {/* Add new */}
      <div style={{ marginTop: 14, padding: "14px 16px", background: "rgba(196,160,60,0.04)", border: "1px dashed var(--gold-muted)", borderRadius: 10 }}>
        <div style={{ fontSize: 12, color: "var(--gold)", letterSpacing: 2, fontWeight: 700, marginBottom: 10 }}>
          {L ? "+ ADD COMPETITOR" : "+ WETTBEWERBER HINZUFÜGEN"}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 0.7fr 1fr 0.9fr auto", gap: 8, alignItems: "end" }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>{L ? "Hotel name" : "Hotel-Name"}</div>
            <input type="text" value={draft.n} onChange={e => setDraft({ ...draft, n: e.target.value })}
              placeholder={L ? "e.g. Hilton Vienna Park" : "z.B. Hilton Vienna Park"}
              style={{ width: "100%", padding: "8px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: 13, fontFamily: "inherit" }} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>{L ? "Stars" : "Sterne"}</div>
            <select value={draft.stars} onChange={e => setDraft({ ...draft, stars: e.target.value })}
              style={{ width: "100%", padding: "8px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: 13, fontFamily: "inherit" }}>
              <option value="3">3★</option>
              <option value="4">4★</option>
              <option value="5">5★</option>
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>{L ? "Distance" : "Distanz"}</div>
            <input type="text" value={draft.dist} onChange={e => setDraft({ ...draft, dist: e.target.value })}
              placeholder="1.5 km"
              style={{ width: "100%", padding: "8px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: 13, fontFamily: "inherit" }} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>{L ? "Base rate" : "Basis-Rate"}</div>
            <input type="number" value={draft.base} onChange={e => setDraft({ ...draft, base: e.target.value })}
              placeholder="119"
              style={{ width: "100%", padding: "8px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: 13, fontFamily: "inherit" }} />
          </div>
          <button onClick={submit} disabled={!valid} className={"btn btn-gold btn-sm" + (valid ? " is-ready" : "")} style={{ whiteSpace: "nowrap" }}>
            {L ? "+ Add" : "+ OK"}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-m)" }}>
          {competitors.filter(c => c.enabled).length} / {competitors.length} {L ? "active" : "aktiv"}
        </div>
        <button className="btn-ghost" style={{ fontSize: 12, color: "var(--text-muted)" }} onClick={reset}>
          {L ? "Reset to defaults" : "Auf Standard zurücksetzen"}
        </button>
      </div>
    </div>
  );
};

const RateShopping = () => {
  const t = useT(); const { lang } = useLang();
  const [range, setRange] = useState("today");
  const [editing, setEditing] = useState(false);
  const [competitors, setCompetitors] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("isq7v3.competitors"));
      if (saved && saved.length > 0) return saved;
    } catch (e) { }
    return DEFAULT_COMPETITORS;
  });
  useEffect(() => { localStorage.setItem("isq7v3.competitors", JSON.stringify(competitors)); }, [competitors]);

  const activeComps = competitors.filter(c => c.enabled);
  const yours = 119;
  const avg = activeComps.length > 0 ? Math.round(activeComps.reduce((s, c) => s + c.today, 0) / activeComps.length) : yours;
  const maxP = Math.max(...activeComps.map(c => c.today), yours) + 5;

  const toggleComp = (id) => setCompetitors(cs => cs.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  const removeComp = (id) => setCompetitors(cs => cs.filter(c => c.id !== id));
  const addComp = (data) => {
    const id = "c" + Date.now();
    const col = COMP_COLORS[competitors.length % COMP_COLORS.length];
    setCompetitors([...competitors, { id, col, enabled: true, w7: 0, w30: 0, today: data.base, ...data }]);
  };
  const updateComp = (id, patch) => setCompetitors(cs => cs.map(c => c.id === id ? { ...c, ...patch } : c));
  const resetDefault = () => {
    if (confirm(lang === "en" ? "Reset competitor list to defaults? Custom entries will be lost." : "Auf Standard-Wettbewerber zurücksetzen? Deine eigenen Einträge gehen verloren.")) {
      setCompetitors(DEFAULT_COMPETITORS);
    }
  };
  const insight = (
    <Fragment>
      {lang === "en"
        ? (<>NH Wien City is surging hard (<span className="mono txt-red">+18€</span> in 30 days) - they're reacting aggressively to the Medical Congress and Festwochen. Your price stays stable, which Corp clients (OMV, Siemens) read as a stability story. <b>Recommendation:</b> for leisure inquiries you can chase +8-12% aggressively, corp rates you hold. 6 regular clients have booked in the last 90 days - the retention strategy works.</>)
        : (<>NH Wien City zieht stark an (<span className="mono txt-red">+18€</span> in 30 Tagen) - sie reagieren aggressiv auf den Medical Congress und die Festwochen. Dein Preis bleibt stabil, was Corp-Kunden (OMV, Siemens) als Stability-Story lesen. <b>Empfehlung:</b> für Leisure-Anfragen darfst du +8-12% aggressiv nachziehen, Corp-Raten hältst du. 6 Stammkunden haben in den letzten 90 Tagen gebucht - die Retention-Strategie läuft.</>)}
    </Fragment>
  );
  const snapshotTitle = range === "today" ? t("snapshot_today") : (range === "w7" ? t("snapshot_7d") : t("snapshot_30d"));
  const visitors = lang === "en" ? "visitors" : "Besucher";
  return (
    <div className="fade-in">
      <div className="page-head">
        <div className="eyebrow">{t("monitor_eyebrow")}</div>
        <h1 className="page-title">{t("monitor_title")}</h1>
        <p className="page-lede">{t("monitor_lede")}</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="lab">{t("your_current")}</div>
          <div className="val txt-gold mono">€ {yours}</div>
        </div>
        <div className="stat-card">
          <div className="lab">{t("market_avg_today")}</div>
          <div className="val mono" style={{ color: "var(--accent)" }}>€ {avg}</div>
        </div>
        <div className="stat-card">
          <div className="lab">{t("position")}</div>
          <div className="val" style={{ color: yours > avg ? "var(--green)" : "var(--red)" }}>{yours > avg ? "+" : ""}{Math.round(((yours - avg) / avg) * 1000) / 10}%</div>
          <div className="delta">{t("vs_market_avg")}</div>
        </div>
        <div className="stat-card">
          <div className="lab">{t("trend_7d")}</div>
          <div className="val txt-green">+4,2%</div>
          <div className="delta pos">{t("market_rising")}</div>
        </div>
        <div className="stat-card">
          <div className="lab">{t("occupancy")}</div>
          <div className="val txt-gold">82%</div>
          <div className="delta pos">+8 {t("vs_week")}</div>
        </div>
      </div>

      <div className="filter-bar">
        {[["today", t("filter_today")], ["w7", t("filter_7d")], ["w30", t("filter_30d")]].map(([k, l]) => (
          <button key={k} className={"filter-pill " + (range === k ? "active" : "")} onClick={() => setRange(k)}>{l}</button>
        ))}
      </div>

      <div className="grid-2">
        <div>
          <div className="section-head" style={{ justifyContent: "space-between" }}>
            <h3>{snapshotTitle}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="note">{t("updated_2min_short")}</span>
              <button className="btn btn-sm" onClick={() => setEditing(!editing)}>
                {editing ? (lang === "en" ? "✓ Done" : "✓ Fertig") : (lang === "en" ? "⚙ Edit list" : "⚙ Bearbeiten")}
              </button>
            </div>
          </div>
          {editing && <CompetitorEditor competitors={competitors} toggle={toggleComp} remove={removeComp} add={addComp} update={updateComp} reset={resetDefault} lang={lang} />}
          {!editing && activeComps.map((c, i) => {
            const p = c.today;
            const trend = range === "today" ? null : (range === "w7" ? c.w7 : c.w30);
            return (
              <div className="comp-row" key={c.id} style={{ gridTemplateColumns: "1.4fr 2fr auto auto", gap: 14 }}>
                <div>
                  <div className="name">{c.n}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{c.stars}★ · {c.dist}</div>
                </div>
                <div className="bar"><div className="fill" style={{ width: `${(p / maxP) * 100}%`, background: c.col }} /></div>
                {trend !== null && <span className="mono" style={{ fontSize: 13, color: trend > 0 ? "var(--red)" : "var(--green)", minWidth: 54, textAlign: "right" }}>{trend > 0 ? "▲" : "▼"} {trend > 0 ? "+" : ""}{trend}€</span>}
                <span className="price">{fmt(p)}</span>
              </div>
            );
          })}
          <div className="comp-row ours" style={{ gridTemplateColumns: "1.4fr 2fr auto auto", gap: 14 }}>
            <div>
              <div className="name"><b>{t("the_lakeview_you")}</b> <span className="ours-tag">●</span></div>
              <div style={{ fontSize: 11, color: "var(--gold)", marginTop: 2 }}>{t("standard_corp_rate")}</div>
            </div>
            <div className="bar"><div className="fill" style={{ width: `${(yours / maxP) * 100}%`, background: "var(--gold)" }} /></div>
            {range !== "today" && <span className="mono" style={{ fontSize: 13, color: "var(--green)", minWidth: 54, textAlign: "right" }}>{t("stable")}</span>}
            <span className="price" style={{ color: "var(--gold)" }}>{fmt(yours)}</span>
          </div>

          <div className="card mt-24" style={{ borderColor: "var(--gold-muted)", background: "rgba(196,160,60,0.04)" }}>
            <div className="ai-reason-head">{t("ai_insight")}</div>
            <div style={{ fontSize: 14, color: "var(--text-sub)", lineHeight: 1.65 }}>{insight}</div>
          </div>
        </div>

        <div>
          <div className="section-head"><h3>{t("upcoming_events")}</h3><span className="note">{t("next_9_months")}</span></div>
          {UPCOMING_EVENTS.map((e, i) => (
            <div className="event-card" key={i} style={{ borderLeftColor: e.col }}>
              <div>
                <div className="date">{e.date}</div>
                <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 2, fontFamily: "var(--font-m)" }}>{t("in_days_tpl", { d: e.days })}</div>
              </div>
              <div>
                <div className="name">{e.name}</div>
                <div className="desc">{e.type} · {e.pax} {visitors}</div>
              </div>
              <div className="impact" style={{ color: e.col }}>{e.impact}</div>
            </div>
          ))}
          <div className="card mt-24">
            <div className="section-head"><h3>{t("price_corridor")}</h3></div>
            <div style={{ fontSize: 13, color: "var(--text-sub)", lineHeight: 1.65 }}>
              <div className="kv"><span className="k">{t("floor")}</span><span className="v mono">€ 89</span></div>
              <div className="kv"><span className="k">{t("corp_rate_omv")}</span><span className="v mono txt-gold">€ 99-119</span></div>
              <div className="kv"><span className="k">{t("standard_bar")}</span><span className="v mono">€ 135-149</span></div>
              <div className="kv"><span className="k">{t("event_surge")}</span><span className="v mono">€ 155-195</span></div>
              <div className="kv"><span className="k">{t("ceiling")}</span><span className="v mono">€ 195</span></div>
              <div className="kv"><span className="k">{t("peak_njk")}</span><span className="v mono txt-red">€ 310+</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// ANALYTICS
// =========================================================================

const Analytics = () => {
  const t = useT();
  return (
    <div className="fade-in">
      <div className="page-head">
        <div className="eyebrow">{t("analytics_eyebrow")}</div>
        <h1 className="page-title">{t("analytics_title")}</h1>
        <p className="page-lede">{t("analytics_lede")}</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card"><div className="lab">{t("kpi_conversion")}</div><div className="val txt-green">12,4%</div><div className="delta pos">+2,1 pp</div></div>
        <div className="stat-card"><div className="lab">{t("kpi_avg_rev")}</div><div className="val mono">€ 8.420</div><div className="delta pos">+€ 640</div></div>
        <div className="stat-card"><div className="lab">{t("kpi_bookings")}</div><div className="val">31</div><div className="delta">{t("of_247")}</div></div>
        <div className="stat-card"><div className="lab">{t("kpi_avg_response")}</div><div className="val txt-green">28s</div><div className="delta pos">{t("auto_parse")}</div></div>
        <div className="stat-card"><div className="lab">{t("kpi_ai_autonomy")}</div><div className="val txt-gold">43%</div><div className="delta">{t("full_cycles_no_human")}</div></div>
      </div>

      <div className="grid-2">
        <div>
          <div className="section-head"><h3>{t("funnel")}</h3><span className="note">{t("funnel_period")}</span></div>
          <div className="card">
            {[
              { l: t("funnel_received"), n: 247, w: 100, col: "var(--accent)" },
              { l: t("funnel_parsed"), n: 247, w: 100, col: "var(--green)" },
              { l: t("funnel_priced"), n: 247, w: 100, col: "var(--gold)" },
              { l: t("funnel_sent"), n: 198, w: 80, col: "var(--purple)" },
              { l: t("funnel_won"), n: 31, w: 12.5, col: "var(--green)" },
            ].map((f, i) => (
              <div key={f.l} style={{ marginBottom: i < 4 ? 12 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{f.l}</span>
                  <span className="mono txt-muted" style={{ fontSize: 13 }}>{f.n}</span>
                </div>
                <div style={{ height: 10, background: "rgba(255,255,255,0.05)", borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ width: `${f.w}%`, height: "100%", background: f.col, borderRadius: 5 }} />
                </div>
              </div>
            ))}
          </div>

          <div className="section-head mt-24"><h3>{t("top_segments")}</h3></div>
          <div className="card">
            {[
              { seg: t("seg_corp_mice"), pct: 47, rev: "€ 142K", col: "var(--accent)" },
              { seg: t("seg_gala"), pct: 32, rev: "€ 85K", col: "var(--gold)" },
              { seg: t("seg_training"), pct: 21, rev: "€ 37K", col: "var(--purple)" },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{s.seg}</span>
                  <span className="mono txt-muted" style={{ fontSize: 13 }}>{s.pct}% · {s.rev}</span>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${s.pct}%`, height: "100%", background: s.col }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="section-head"><h3>{t("ai_suggestions")}</h3><span className="note">{t("based_on_data")}</span></div>
          {[
            { tt: t("sugg_late_co_t"), d: t("sugg_late_co_d"), col: "var(--green)" },
            { tt: t("sugg_fnb_t"), d: t("sugg_fnb_d"), col: "var(--gold)" },
            { tt: t("sugg_appr_t"), d: t("sugg_appr_d"), col: "var(--accent)" },
            { tt: t("sugg_omv_t"), d: t("sugg_omv_d"), col: "var(--purple)" },
            { tt: t("sugg_tech_t"), d: t("sugg_tech_d"), col: "var(--red)" },
          ].map((s, i) => (
            <div className="card card-tight" key={i} style={{ marginBottom: 10, borderLeft: `3px solid ${s.col}` }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{s.tt}</div>
              <div style={{ fontSize: 13, color: "var(--text-sub)", marginTop: 4, lineHeight: 1.55 }}>{s.d}</div>
            </div>
          ))}

          <div className="section-head mt-24"><h3>{t("handled_by")}</h3></div>
          <div className="card">
            {[
              { name: "Andreas Bauer", cnt: 18, col: "var(--gold)" },
              { name: "Sarah Klein", cnt: 7, col: "var(--accent)" },
              { name: t("ai_auto"), cnt: 13, col: "var(--green)" },
            ].map((h, i) => (
              <div key={i} className="kv"><span className="k">{h.name}</span><span className="v mono" style={{ color: h.col }}>{h.cnt}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// ARCHIVE
// =========================================================================

const Archive = ({ archiveId, setArchiveId }) => {
  if (archiveId) return <ArchiveDetail id={archiveId} onBack={() => setArchiveId(null)} />;
  return <ArchiveList setArchiveId={setArchiveId} />;
};
const ArchiveList = ({ setArchiveId }) => {
  const t = useT();
  const [filter, setFilter] = useState("all");
  const filtered = ARCHIVE.filter(a => filter === "all" || a.outcome === filter);
  const stats = {
    total: ARCHIVE.length,
    won: ARCHIVE.filter(a => a.outcome === "won").length,
    lost: ARCHIVE.filter(a => a.outcome === "lost").length,
    revenue: ARCHIVE.filter(a => a.outcome === "won" || a.outcome === "recurring").reduce((s, a) => s + a.value, 0),
  };
  const winRate = Math.round((stats.won / (stats.won + stats.lost)) * 100);
  const OUTCOME = {
    won: { label: t("out_won"), col: "var(--green)" },
    lost: { label: t("out_lost"), col: "var(--red)" },
    recurring: { label: t("out_recurring"), col: "var(--gold)" },
  };
  const FILTERS = [
    { id: "all", label: `${t("filter_all")} · ${stats.total}` },
    { id: "won", label: `${t("filter_won")} · ${stats.won}` },
    { id: "lost", label: `${t("filter_lost")} · ${stats.lost}` },
    { id: "recurring", label: t("filter_recurring") },
  ];
  return (
    <div className="fade-in">
      <div className="page-head">
        <div className="eyebrow">{t("archive_eyebrow")}</div>
        <h1 className="page-title">{t("archive_title")}</h1>
        <p className="page-lede">{t("archive_lede_tpl", { total: stats.total, wr: winRate, rev: fmt(stats.revenue) })}</p>
      </div>

      <div className="filter-bar">
        {FILTERS.map(f => (
          <button key={f.id} className={"filter-pill " + (filter === f.id ? "active" : "")} onClick={() => setFilter(f.id)}>{f.label}</button>
        ))}
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="inq-header" style={{ gridTemplateColumns: "1.8fr 2.8fr 1fr 1.3fr 1.2fr 0.3fr" }}>
          <div>{t("arch_client")}</div><div>{t("arch_inquiry")}</div><div>{t("arch_outcome")}</div><div>{t("arch_volume")}</div><div>{t("arch_handled")}</div><div/>
        </div>
        {filtered.length === 0 && <div className="empty">{t("no_in_category")}</div>}
        {filtered.map(a => {
          const o = OUTCOME[a.outcome];
          return (
            <div className="inq-row" key={a.id} style={{ gridTemplateColumns: "1.8fr 2.8fr 1fr 1.3fr 1.2fr 0.3fr" }} onClick={() => setArchiveId(a.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="avatar-sm" style={{ opacity: 0.75 }}>{a.co.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div className="co">{a.co}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{a.from}</div>
                </div>
              </div>
              <div className="subj">{a.summary}</div>
              <div><Bdg text={o.label} col={o.col} size="sm" /></div>
              <div className="rev" style={{ color: a.outcome === "lost" ? "var(--text-muted)" : "var(--gold)", textDecoration: a.outcome === "lost" ? "line-through" : "none" }}>{fmt(a.value)}</div>
              <div className="t" style={{ fontSize: 12 }}>{a.handledBy}</div>
              <div className="arrow">{"›"}</div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-m)" }}>
        {t("archive_footer")}
      </div>
    </div>
  );
};

const ArchiveDetail = ({ id, onBack }) => {
  const a = ARCHIVE.find(x => x.id === id);
  if (!a) return null;
  return <ArchiveDetailInner a={a} onBack={onBack} />;
};
const ArchiveDetailInner = ({ a, onBack }) => {
  const t = useT(); const { lang } = useLang();
  const OUTCOME = {
    won: { label: t("out_won"), col: "var(--green)", title: t("deal_won_title"), sub: t("deal_won_sub") },
    lost: { label: t("out_lost"), col: "var(--red)", title: t("deal_lost_title"), sub: t("deal_lost_sub") },
    recurring: { label: t("out_recurring"), col: "var(--gold)", title: t("deal_recurring_title"), sub: t("deal_recurring_sub") },
  };
  const o = OUTCOME[a.outcome];
  const KIND_COL = { in: "var(--text-muted)", ai: "var(--gold)", out: "var(--text-muted)", rev: "var(--accent)", send: "var(--gold)", track: "var(--text-muted)", nego: "var(--purple)", won: "var(--green)", lost: "var(--red)" };
  return (
    <div className="fade-in">
      <button className="btn mb-24" onClick={onBack}>{"←"} {t("back_to_archive")}</button>
      <div className="flex" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <div className="eyebrow">{a.co} · {summary(a, lang) || a.summary}</div>
          <h1 className="page-title">{o.title}</h1>
          <p className="page-lede">{o.sub}</p>
        </div>
        <Bdg text={o.label} col={o.col} />
      </div>

      <div className="card mt-24">
        <div className="section-head"><h3>{t("result")}</h3><span className="note">{a.sent}</span></div>
        <div className="memory-stats" style={{ borderBottom: 0 }}>
          <div><div className="l">{t("offer")}</div><div className="v mono">{fmt(a.offered)}</div></div>
          <div><div className="l">{a.outcome === "lost" ? t("not_achieved") : t("final")}</div><div className="v mono" style={{ color: a.outcome === "lost" ? "var(--red)" : (a.value !== a.offered ? "var(--gold)" : "var(--text)") }}>{a.outcome === "lost" ? "-" : fmt(a.value)}</div></div>
          <div><div className="l">{t("response_time")}</div><div className="v mono">{a.replied}</div></div>
          <div><div className="l">{t("handled_by_cap")}</div><div className="v" style={{ fontSize: 14 }}>{a.handledBy}</div></div>
        </div>
        {a.lostReason && (
          <div className="ai-reason" style={{ borderColor: "var(--red-muted)", background: "rgba(248,113,113,0.05)" }}>
            <div className="ai-reason-head" style={{ color: "var(--red)" }}>{t("lost_reason")}</div>
            <div className="ai-reason-body">{a.lostReason}</div>
          </div>
        )}
        {a.value !== a.offered && !a.lostReason && (
          <div className="ai-reason">
            <div className="ai-reason-head">{t("negotiation")}</div>
            <div className="ai-reason-body">{t("negotiated_from_tpl", { off: fmt(a.offered), val: fmt(a.value), diff: fmt(a.offered - a.value) })}</div>
          </div>
        )}
      </div>

      <div className="card mt-16">
        <div className="section-head"><h3>{t("timeline")}</h3><span className="note">{a.timeline.length} {t("events_cnt")}</span></div>
        <div className="timeline">
          {a.timeline.map((tl, i) => (
            <div className="tl-row" key={i}>
              <div className="tl-time">{tl.t}</div>
              <div className="tl-dot" style={{ background: `color-mix(in srgb, ${KIND_COL[tl.kind]} 15%, transparent)`, color: KIND_COL[tl.kind], border: `1px solid color-mix(in srgb, ${KIND_COL[tl.kind]} 30%, transparent)` }}>●</div>
              <div className="tl-label">{tl.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mt-16">
        <div className="section-head"><h3>{t("what_ai_learned")}</h3><span className="note">{a.learnings.length} {t("lessons_cnt")}</span></div>
        {a.learnings.map((l, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 16, padding: "14px 0", borderBottom: i < a.learnings.length - 1 ? "1px dashed var(--border)" : "none" }}>
            <div className="mono" style={{ fontSize: 12, color: "var(--gold)", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</div>
            <div style={{ fontSize: 14, color: "var(--text-sub)", lineHeight: 1.6 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// SETTINGS (ISQ7 Configuration - rules editor)
// =========================================================================

const Config = () => (<ConfigBody />);
const ConfigBody = () => {
  const t = useT(); const { lang } = useLang();
  const [rules, setRules] = useState(() => {
    try { return JSON.parse(localStorage.getItem("isq7v3.rules")) || DEFAULT_RULES; }
    catch (e) { return DEFAULT_RULES; }
  });
  const [drafts, setDrafts] = useState({});
  const [activeCat, setActiveCat] = useState(null);
  const [saved, setSaved] = useState(true);
  const [versions, setVersions] = useState(() => {
    try { return JSON.parse(localStorage.getItem("isq7v3.versions")) || []; }
    catch (e) { return []; }
  });
  const [undoRule, setUndoRule] = useState(null);

  const baseline = versions[0]?.rules || DEFAULT_RULES;
  const dirty = JSON.stringify(rules) !== JSON.stringify(baseline);

  useEffect(() => {
    localStorage.setItem("isq7v3.rules", JSON.stringify(rules));
    setSaved(false);
    const to = setTimeout(() => setSaved(true), 700);
    return () => clearTimeout(to);
  }, [rules]);
  useEffect(() => { localStorage.setItem("isq7v3.versions", JSON.stringify(versions)); }, [versions]);

  const addRuleForCat = (cat) => {
    const text = (drafts[cat] || "").trim();
    if (!text) return;
    setRules([...rules, { id: "r" + Date.now(), cat, text }]);
    setDrafts({ ...drafts, [cat]: "" });
    setActiveCat(null);
  };
  const removeRule = (id) => {
    const r = rules.find(x => x.id === id);
    setRules(rules.filter(x => x.id !== id));
    setUndoRule(r);
    setTimeout(() => setUndoRule(curr => curr && curr.id === r.id ? null : curr), 5000);
  };
  const undoRemove = () => {
    if (!undoRule) return;
    setRules([...rules, undoRule]);
    setUndoRule(null);
  };
  const updateRule = (id, text) => setRules(rules.map(r => r.id === id ? { ...r, text } : r));
  const saveVersion = () => {
    const v = { id: "v" + Date.now(), at: new Date().toLocaleString(lang === "en" ? "en-US" : "de-DE"), count: rules.length, rules: [...rules] };
    setVersions([v, ...versions]);
  };
  const resetDefaults = () => {
    if (confirm(t("confirm_reset"))) setRules(DEFAULT_RULES);
  };
  const catLabel = (cat) => {
    const map = { "Autorität": t("cat_authority"), "VIP": t("cat_vip"), "Eskalation": t("cat_escalation"), "Kontext": t("cat_context"), "Ton": t("cat_tone"), "Event": t("cat_event") };
    return map[cat] || cat;
  };

  return (
    <div className="fade-in">
      <div className="page-head">
        <div className="eyebrow">{t("settings_eyebrow")}</div>
        <h1 className="page-title">{t("settings_title")}</h1>
        <p className="page-lede">{t("settings_lede")}</p>
      </div>

      <div className="card">
        <div className="section-head">
          <h3>{t("add_new_rule")}</h3>
          <span className="note">{saved ? t("all_saved") : t("saving")}</span>
        </div>
        <div style={{ color: "var(--text-sub)", fontSize: 13, marginBottom: 14 }}>{t("pick_cat")}</div>
        <div className="flex flex-col gap-8">
          {CATS.map(cat => {
            const isOpen = activeCat === cat;
            return (
              <div key={cat} className="rule-cat">
                <div className="head" onClick={() => setActiveCat(isOpen ? null : cat)}>
                  <div className="flex" style={{ alignItems: "center", gap: 12 }}>
                    <Bdg text={catLabel(cat)} col={isOpen ? "var(--gold)" : "var(--text-muted)"} size="sm" />
                    <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{CAT_HINTS[cat]}</span>
                  </div>
                  <span style={{ color: "var(--text-muted)", transition: "transform .2s", transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}>{"›"}</span>
                </div>
                {isOpen && (
                  <div className="mt-16 fade-in">
                    <textarea className="ta" rows={3} autoFocus value={drafts[cat] || ""}
                      onChange={e => setDrafts({ ...drafts, [cat]: e.target.value })}
                      onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") addRuleForCat(cat); }}
                      placeholder={CAT_HINTS[cat]} />
                    <div className="flex" style={{ justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-m)" }}>{t("ctrl_enter")}</span>
                      <button className={"btn btn-gold btn-sm" + ((drafts[cat] || "").trim() ? " is-ready" : "")} onClick={() => addRuleForCat(cat)} disabled={!(drafts[cat] || "").trim()}>{t("add_rule_btn")}</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card mt-16">
        <div className="section-head">
          <h3>{t("active_rules_cnt")} · {rules.length}</h3>
          <span className="note">{t("click_to_edit")}</span>
        </div>
        {rules.length === 0 && <div className="empty">{t("no_rules_yet")}</div>}
        {rules.map((r, i) => (
          <div key={r.id} className="rule-item">
            <Bdg text={catLabel(r.cat)} col="var(--text-muted)" size="sm" />
            <div className="rule-text" contentEditable suppressContentEditableWarning onBlur={e => updateRule(r.id, e.currentTarget.textContent)}>{r.text}</div>
            <button className="rule-del" onClick={() => removeRule(r.id)} title="×">×</button>
          </div>
        ))}
      </div>

      <div className="flex gap-12 mt-24">
        {dirty && <button className="btn btn-gold is-ready" onClick={saveVersion}>{t("save_version")}</button>}
        <button className="btn">{t("history")} ({versions.length})</button>
        <button className="btn" onClick={resetDefaults}>{t("reset_defaults")}</button>
      </div>

      {undoRule && (
        <div className="toast-host">
          <div className="toast-item" style={{ borderColor: "var(--gold-muted)", borderLeftColor: "var(--gold)", display: "flex", alignItems: "center", gap: 14 }}>
            <span>{t("rule_deleted")}</span>
            <button className="btn btn-sm" onClick={undoRemove}>{t("undo")}</button>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// APP ROOT
// =========================================================================

const App = () => {
  const [lang, setLang] = useState(() => localStorage.getItem("isq7v3.lang") || "de");
  const t = (k, args) => tFmt((STRINGS[lang] && STRINGS[lang][k]) || (STRINGS.de[k] || k), args);
  useEffect(() => { localStorage.setItem("isq7v3.lang", lang); document.documentElement.setAttribute("lang", lang); }, [lang]);

  const [section, setSection] = useState("inbox");
  const [step, setStep] = useState("inbox"); // within inquiries: inbox | inquiry | price | sent
  const [activeId, setActiveId] = useState(null);
  const [archiveId, setArchiveId] = useState(null);
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("isq7v3.data"));
      if (saved) {
        const merged = { ...INQUIRIES };
        for (const k of Object.keys(saved)) merged[k] = saved[k];
        return merged;
      }
    } catch (e) { }
    return INQUIRIES;
  });

  useEffect(() => {
    localStorage.setItem("isq7v3.data", JSON.stringify(inquiries));
  }, [inquiries]);

  const go = (s, id) => {
    const isSection = ["rates", "analytics", "archive", "settings"].includes(s);
    if (isSection) {
      setSection(s);
      setActiveId(null);
      setStep("inbox");
      if (s !== "archive") setArchiveId(null);
    } else {
      if (id) setActiveId(id);
      else if (s === "inbox") setActiveId(null);
      setStep(s);
      setSection("inbox");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const updateInquiry = (id, patch) => {
    setInquiries(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };
  const onNav = (sec) => {
    setSection(sec);
    if (sec === "inbox") { setStep("inbox"); setActiveId(null); }
    if (sec !== "archive") setArchiveId(null);
  };

  const active = inquiries[activeId];
  const openCount = ORDER.filter(id => inquiries[id] && inquiries[id].status !== "sent").length;

  // Determine content + topbar
  let body, title, subtitle, live = false, onBack = null;

  if (section === "inbox") {
    if (step === "inquiry" && active) {
      body = <Inquiry q={active} go={go} updateInquiry={updateInquiry} />;
      title = active.co; subtitle = summary(active, lang);
      onBack = () => go("inbox");
    } else if (step === "price" && active) {
      body = <Pricing q={active} go={go} updateInquiry={updateInquiry} />;
      title = t("pricing_label"); subtitle = `${active.co} · ${summary(active, lang)}`;
      onBack = () => go("inquiry", active.id);
    } else if (step === "sent" && active) {
      body = <Sent q={active} go={go} />;
      title = t("proposal_sent"); subtitle = active.co;
      onBack = () => go("inbox");
    } else {
      body = <Inbox inquiries={inquiries} go={go} />;
      title = t("nav_inquiries"); subtitle = t("today"); live = true;
    }
  } else if (section === "rates") {
    body = <RateShopping />;
    title = t("nav_monitor"); subtitle = t("vienna_live"); live = true;
  } else if (section === "analytics") {
    body = <Analytics />;
    title = t("nav_analytics"); subtitle = t("last_30_days");
  } else if (section === "archive") {
    body = <Archive archiveId={archiveId} setArchiveId={setArchiveId} />;
    title = t("nav_archive"); subtitle = archiveId ? ARCHIVE.find(a => a.id === archiveId)?.co : (lang === "de" ? "60 Tage" : "60 days");
  } else if (section === "settings") {
    body = <Config />;
    title = t("nav_settings"); subtitle = "The Lakeview Vienna";
  }

  const centered = (section === "inbox" && (step === "inquiry" || step === "price" || step === "sent")) || section === "settings" || (section === "archive" && archiveId);

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      <div className="app">
        <Sidebar active={section} onNav={onNav} openCount={openCount} />
        <div className="main">
          <TopBar title={title} subtitle={subtitle} live={live} onBack={onBack} lang={lang} setLang={setLang} />
          <div className={"content" + (centered ? " narrow" : "")}>{body}</div>
        </div>
      </div>
    </LangCtx.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
