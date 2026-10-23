export interface CaseStudy {
  slug: string
  type: 'web' | 'ai'
  title: string
  summary: string
  liveUrl?: string
  githubUrl?: string
  challenge: string
  role: string
  techStack: string[]
  built: { heading: string; body: string; image?: string }[]
  outcome: { metric: string; label: string }[]
  nextSlug?: string
}

export const CASE_STUDY_SLUGS = ['alpr'] as const

export const CASE_STUDIES: Record<string, CaseStudy> = {
  alpr: {
    slug: 'alpr',
    type: 'ai',
    title: 'Automatic Vehicle Gate Access System',
    summary:
      'My final-year project: a smart gate that reads license plates, recognizes the vehicle make and model, and decides whether to allow entry — even in fog, rain, or at night — with results shown on a live dashboard.',
    liveUrl: 'https://automated-gate-access.vercel.app',
    githubUrl: 'https://github.com/alirazach476/Smart-Vehicle-Access-System-LPD-VMMR',
    challenge:
      'At many gates, a security guard still has to check every vehicle by hand. That is slow, easy to get wrong, and weak against someone who copies a valid plate onto another car. Bad weather and low light make plates even harder to read. Sending every camera frame to the cloud also adds delay when the decision needs to happen at the gate.',
    role:
      'My ownership on the FYP was the recognition pipeline and product surface: weather-aware image cleanup, plate and character detection, vehicle make/model recognition, access rules that check plate plus vehicle identity, on-device inference on an Orange Pi, and the React dashboard for monitoring and temporary visitor passes.',
    techStack: [
      'YOLOv8n',
      'EfficientNet-B4',
      'OpenCV',
      'Python',
      'Orange Pi 5 Pro',
      'FastAPI',
      'React',
      'Vercel',
    ],
    built: [
      {
        heading: 'Authorized vehicle — access allowed',
        body: 'A registered resident arrives in a Suzuki Wagon R with plate LEH-8357. The camera captures the car, the system reads the plate, predicts the make and model, and checks both against the authorized list. When they match, access is allowed and the event is logged. In our report example, the Wagon R was predicted at about 85% confidence and the decision was allow.',
      },
      {
        heading: 'Unauthorized vehicle — access denied',
        body: 'An unknown car shows plate BQX-687 and is classified as a Changan Alsvin. After reading the plate and vehicle type, the system finds no matching authorization and denies entry. The denial is stored on the dashboard so security can review it later. Report example: about 83% model confidence, access denied.',
      },
      {
        heading: 'Working in fog',
        body: 'Fog washes out plates and vehicle details. Before recognition, a fog-cleaning step clears the haze so the detector has a cleaner image to work with. The idea is simple: improve the picture first, then run the AI — not force the model to guess through heavy fog.',
      },
      {
        heading: 'Working in rain',
        body: 'Rain streaks can hide parts of the plate. A rain-cleaning step softens those streaks and fills damaged areas, then the normal recognition pipeline runs. Heavy rain or a badly covered plate can still hurt accuracy — the system improves the image, it does not promise perfect results in every storm.',
      },
      {
        heading: 'Working at night',
        body: 'In low light, plates and car features are hard to see. A night-enhancement step boosts local contrast and brightness, then detection and classification continue as usual. Fog, rain, and night all sit in one shared preprocessing path instead of three separate apps.',
      },
      {
        heading: 'Fake plate or vehicle swap',
        body: 'Checking the plate alone is not enough if someone sticks a valid plate on a different car. The system also predicts make and model and compares that with what is registered for that plate. If they do not match, access can be denied. Similar-looking cars can still confuse the classifier, so this is an extra layer of security — not a guarantee against every spoof.',
      },
      {
        heading: 'Temporary visitor access',
        body: 'Guests, contractors, and delivery vehicles should not stay on the permanent allow list. From the dashboard, an operator can add a visitor with a time window. When that vehicle arrives, the system still identifies it, but access is granted only while the pass is valid.',
      },
      {
        heading: 'On-device AI and live monitoring',
        body: 'Recognition runs locally on an Orange Pi 5 Pro so the gate does not depend on a fast cloud round-trip for every frame. Inference typically lands around 0.7–1 second per image on the device CPU, which met our under-two-seconds goal. Results are sent to the cloud API and shown on the React dashboard — plate, confidence, weather context, and allow/deny. Wiring the physical gate motor was left as future work; the software decisions and logs are complete.',
      },
    ],
    outcome: [
      { metric: 'Allow/Deny', label: 'Plate + vehicle identity check' },
      { metric: '~0.7–1s', label: 'On-device inference' },
      { metric: 'Fog·Rain·Night', label: 'Weather-aware pipeline' },
      { metric: 'Live', label: 'Dashboard monitoring' },
    ],
  },
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug]
}

export function hasCaseStudy(slug: string): boolean {
  return CASE_STUDY_SLUGS.includes(slug as (typeof CASE_STUDY_SLUGS)[number])
}
