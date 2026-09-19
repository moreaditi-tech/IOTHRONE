/**
 * Centralized Configuration for IOTHRONE Google Form Integration
 *
 * Official Google Form Responder URL: https://forms.gle/VimU86cWRDFk9EDWA
 * Verified Google Form ID: 1FAIpQLSfCCTP3C6VirvOnnr0UyZPBamne1JiqUFbRSbVTRMCFQFAYQg
 */

export const GOOGLE_FORM_CONFIG = {
  FORM_URL: 'https://forms.gle/VimU86cWRDFk9EDWA',
  SUBMIT_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSfCCTP3C6VirvOnnr0UyZPBamne1JiqUFbRSbVTRMCFQFAYQg/formResponse',

  // Actual verified Google Form Entry IDs for each field
  ENTRY_IDS: {
    TEAM_NAME: 'entry.486995650',
    TRACK: 'entry.136400574',
    LEADER_NAME: 'entry.1386285909',
    LEADER_EMAIL: 'entry.1937621925',
    LEADER_PHONE: 'entry.2098187535',
    INSTITUTION: 'entry.1559536885',
    MEMBER_2: 'entry.1109577150',
    MEMBER_3: 'entry.840287844',
    MEMBER_4: 'entry.1755188630',
    PROJECT_TITLE: 'entry.995408721',
    ABSTRACT: 'entry.846711423',
    TECHNOLOGIES: 'entry.1320040103',
    PROTOTYPE_STATUS: 'entry.1272363968',
    CONFIRMATION: 'entry.1196463986',
  },

  // Prototype Status options mapping between website UI and Google Form
  PROTOTYPE_STATUS_MAPPING: {
    'Idea / Concept': 'Idea / Conceptual Stage',
    'Prototype in Development': 'Working Prototype / Simulation',
    'Working Prototype': 'Hardware Assembled & Tested',
    'Fully Demonstrable Prototype': 'Fully Completed Project'
  } as Record<string, string>,

  // Default team confirmation string required by Google Form
  CONFIRMATION_TEXT: 'I confirm that all provided details are correct and our team agrees to the competition rules.'
};
