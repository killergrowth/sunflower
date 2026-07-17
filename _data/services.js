// _data/services.js â€” Service config for service+location page generation
// Each entry maps to a sub-service page and drives the 456 service+location pages.

module.exports = [
  {
    slug: 'plumbing',
    parentHub: 'plumbing',
    hubSlug: 'plumbing',
    displayName: 'Plumbing Services',
    shortName: 'Plumbing',
    hubLabel: 'Plumbing',
    schemaType: 'Plumber',
    urlPrefix: 'plumbing',
    isTopLevel: true,
    tagline: 'Licensed plumbing for homes and businesses',
    pitch: 'Full-service plumbing â€” from leaky faucets to full pipe replacements. Licensed, insured, and locally owned in Butler County.',
    serviceBody: 'Sunflower Plumbing handles the full range of residential and commercial plumbing needs in {{CITY_NAME}}, KS. Whether you need a faucet replaced, a water line repaired, or a full re-pipe on an older home, we diagnose honestly, quote upfront, and fix it right the first time.\n\nMany homes in {{CITY_NAME}} and throughout {{COUNTY_NAME}} were built in the mid-twentieth century and still carry their original galvanized steel or cast iron supply and drain lines. These materials have a finite service life â€” galvanized steel corrodes from the inside out, reducing flow and eventually failing. Cast iron drain lines develop cracks and root intrusion over decades. We assess what you actually have, not what a quick visual suggests.\n\nFor newer construction, we handle everything from appliance connections and fixture installs to whole-house rough-in for additions and remodels. Our plumbers work cleanly, pull permits when required, and leave the job site the way they found it.\n\nUpfront pricing is standard â€” we quote before we work, and the price doesn\'t change unless the scope changes. No surprise invoices at the end of the job.',
    differentiator: 'One licensed plumber covers the full scope â€” no trade handoffs, no inflated subcontractor markups.',
    urgencyNote: 'Plumbing issues that go unaddressed almost always get worse. We offer 24/7 emergency response for urgent situations in {{CITY_NAME}}.',
    cta: 'Call for a plumbing quote',
    faqs: [
      {
        q: 'Do you charge for a plumbing estimate in {{CITY_NAME}}?',
        a: 'We provide upfront pricing before work begins. For most standard jobs we diagnose on arrival and quote before touching anything. Call us at (316) 333-6326 to discuss your situation.'
      },
      {
        q: 'Are you licensed and insured to do plumbing work in Kansas?',
        a: 'Yes. Sunflower Plumbing holds a Kansas plumbing license and carries full liability and workers\' comp insurance. We pull permits when required by {{COUNTY_NAME}} or local jurisdiction.'
      },
      {
        q: 'How quickly can you respond to a plumbing emergency in {{CITY_NAME}}?',
        a: 'We offer 24/7 emergency response. Based in El Dorado, we serve {{CITY_NAME}} and the surrounding {{COUNTY_NAME}} area with faster response times than Wichita-based contractors.'
      },
      {
        q: 'Can you handle both repairs and new installation work?',
        a: 'Yes â€” from a single faucet repair to full rough-in for a remodel or addition. We handle residential and light commercial plumbing across the full scope.'
      },
      {
        q: 'My home was built in the 1970s. Should I be worried about my pipes?',
        a: 'Homes built before 1980 in {{CITY_NAME}} and {{COUNTY_NAME}} often have galvanized steel supply lines or cast iron drain lines approaching end of life. We can inspect your system and give you an honest assessment â€” no pressure to replace anything that doesn\'t need it.'
      },
    ],
  },
  {
    slug: 'water-heater-repair',
    parentHub: 'plumbing',
    hubSlug: 'plumbing',
    displayName: 'Water Heater Repair & Installation',
    shortName: 'Water Heater Repair',
    hubLabel: 'Plumbing',
    schemaType: 'Plumber',
    urlPrefix: 'plumbing/water-heater-repair',
    isTopLevel: false,
    tagline: 'Water heater repair and replacement',
    pitch: 'Water heater repair and installation in {{CITY_NAME}}, KS. Same-day service on most calls. Tank and tankless units.',
    serviceBody: 'When your water heater fails in {{CITY_NAME}}, you need a local plumber who can respond fast. Sunflower Plumbing handles water heater repairs, element replacements, thermostat repairs, and full unit replacements â€” both tank and tankless. We carry common parts and units on the truck, so most jobs are handled same-day.\n\nHard water throughout {{COUNTY_NAME}} is particularly rough on water heaters. Mineral scale builds up on heating elements and the tank floor, reducing efficiency and shortening equipment life. If your unit is making a popping or rumbling noise, that\'s scale â€” and it means your heater is working harder than it should be. A flush or element replacement can extend the life of the unit by several years when caught early.\n\nFor tankless water heaters, we service all major brands and handle descaling, flow sensor repairs, venting issues, and error code diagnostics. Tankless units have more failure points than tank heaters but also a longer service life when maintained properly.\n\nIf replacement is the right call, we\'ll tell you â€” not push you toward a new unit when a repair makes sense. We carry 40 and 50-gallon tank units and can typically install same-day. For tankless upgrades, we\'ll walk through the venting and gas line requirements so there are no surprises mid-install.',
    differentiator: 'We\'ll tell you honestly whether your unit needs a repair or a replacement â€” not just what generates the bigger ticket.',
    urgencyNote: 'A failing water heater often gives warning signs: discolored water, popping or rumbling sounds, or inconsistent temperature. Don\'t wait for a full failure.',
    cta: 'Call for water heater service',
    faqs: [
      {
        q: 'How do I know if my water heater needs repair or replacement?',
        a: 'Units under 8 years old with a single failure point â€” an element, thermostat, or anode rod â€” are usually worth repairing. Units over 12 years old, or those with tank corrosion or recurring failures, typically make more sense to replace. We\'ll give you an honest assessment on arrival.'
      },
      {
        q: 'Do you service tankless water heaters in {{CITY_NAME}}?',
        a: 'Yes. We service all major tankless brands including Rinnai, Navien, Rheem, and Bradford White. We handle descaling, flow sensor issues, venting repairs, and error code diagnostics.'
      },
      {
        q: 'How long does a water heater installation take?',
        a: 'Most standard tank replacements take 2â€“3 hours. Tankless installations take longer depending on venting and gas line requirements â€” typically 3â€“5 hours. We\'ll give you a time estimate before we start.'
      },
      {
        q: 'Why does my water heater make a popping or rumbling noise?',
        a: 'That sound is mineral scale â€” common in {{COUNTY_NAME}} due to hard water â€” accumulating on the heating element or tank floor. It means the heater is working harder than normal. A flush or element replacement often resolves it and extends the unit\'s life.'
      },
      {
        q: 'Can you install a water heater same-day in {{CITY_NAME}}?',
        a: 'In most cases, yes. We carry standard 40 and 50-gallon tank units on the truck. Call (316) 333-6326 and we\'ll let you know availability for your area.'
      },
    ],
  },
  {
    slug: 'drain-cleaning',
    parentHub: 'plumbing',
    hubSlug: 'plumbing',
    displayName: 'Drain Cleaning & Clog Removal',
    shortName: 'Drain Cleaning',
    hubLabel: 'Plumbing',
    schemaType: 'Plumber',
    urlPrefix: 'plumbing/drain-cleaning',
    isTopLevel: false,
    tagline: 'Drain cleaning and clog removal',
    pitch: 'Drain cleaning and clog removal in {{CITY_NAME}}, KS. Kitchen drains, bathroom drains, main line clogs â€” we clear them all.',
    serviceBody: 'A slow or stopped drain in {{CITY_NAME}} is more than an inconvenience â€” it can signal a deeper issue in the drain line. Sunflower Plumbing clears kitchen drains, bathroom drains, floor drains, and main sewer lines using professional hydro-jetting and drain snake equipment. We also camera inspect when a recurring clog suggests a structural problem in the line.\n\nOlder homes in {{COUNTY_NAME}} frequently have clay tile sewer lines running from the house to the street. Tree roots enter through the joints, and the slow creep of root intrusion creates blockages that come back every season unless the root mass is cleared or the line is replaced. We use a drain camera to distinguish a simple grease clog from root intrusion â€” they require different solutions.\n\nFor kitchen drains, grease accumulation is the most common culprit. Grease solidifies in the pipe walls over time and eventually blocks flow entirely. Hydro-jetting scours the pipe walls clean rather than just punching a hole through the buildup, which is why it lasts longer than snaking alone on grease-heavy lines.\n\nIf a camera inspection reveals pipe damage â€” cracks, bellied sections, or significant root intrusion â€” we\'ll walk you through the repair options before any work begins. You\'ll always know what you\'re dealing with before you decide how to handle it.',
    differentiator: 'We don\'t just clear the clog and leave. If a camera shows root intrusion, grease buildup, or pipe damage, we tell you what\'s causing it â€” not just treat the symptom.',
    urgencyNote: 'A completely stopped drain â€” especially on the main line â€” needs same-day attention. We\'re available 24/7 for drain emergencies in {{CITY_NAME}}.',
    cta: 'Call for drain service',
    faqs: [
      {
        q: 'What\'s the difference between drain snaking and hydro-jetting?',
        a: 'A snake punches through a clog; hydro-jetting scours the pipe walls at high pressure. For grease or mineral buildup, hydro-jetting lasts significantly longer. For a simple hair clog, snaking is usually sufficient. We\'ll recommend the right method for what you\'re dealing with.'
      },
      {
        q: 'Why does my drain keep clogging in the same spot?',
        a: 'Recurring clogs in the same location usually indicate a structural problem â€” root intrusion, a belly in the pipe, or a cracked joint collecting debris. We camera inspect to find the cause so we\'re fixing the actual problem, not just clearing it again.'
      },
      {
        q: 'How do I know if my main sewer line is clogged vs. a single drain?',
        a: 'If multiple fixtures are draining slowly â€” or if flushing the toilet causes water to back up in the tub or shower â€” that points to a main line issue rather than a single branch drain. Call us immediately; a main line backup needs same-day service.'
      },
      {
        q: 'Do you use a camera to inspect drain lines in {{CITY_NAME}}?',
        a: 'Yes. For recurring clogs or situations where the cause isn\'t obvious, we run a camera down the line to see exactly what\'s happening. This is included when camera inspection is needed to diagnose the problem.'
      },
      {
        q: 'Can tree roots really get into my drain pipes?',
        a: 'Yes â€” and it\'s very common in {{COUNTY_NAME}} neighborhoods with mature trees. Roots enter through clay tile joints and slowly fill the pipe over years. Regular rooter service can keep it clear, but if the intrusion is severe enough, line repair or replacement is the long-term solution.'
      },
    ],
  },
  {
    slug: 'leak-detection',
    parentHub: 'plumbing',
    hubSlug: 'plumbing',
    displayName: 'Leak Detection & Repair',
    shortName: 'Leak Detection',
    hubLabel: 'Plumbing',
    schemaType: 'Plumber',
    urlPrefix: 'plumbing/leak-detection',
    isTopLevel: false,
    tagline: 'Leak detection and pipe repair',
    pitch: 'Leak detection and pipe repair in {{CITY_NAME}}, KS. Visible and hidden leaks found fast â€” before they become water damage.',
    serviceBody: 'Hidden leaks in {{CITY_NAME}} homes can run water bills up hundreds of dollars a month and cause structural damage before you see a wet spot. Sunflower Plumbing locates hidden leaks in walls, under slabs, and in supply lines using professional detection equipment â€” then repairs what we find cleanly and correctly.\n\nSlab leaks are particularly common in homes built on concrete slabs throughout {{COUNTY_NAME}}. The soil movement that comes with clay-heavy ground and Kansas freeze-thaw cycles stresses supply lines running under the slab. A slab leak can go undetected for months while water migrates under the foundation. Symptoms include warm spots on the floor, the sound of running water when no fixtures are in use, or an unexplained spike in the water bill.\n\nFor wall and ceiling leaks, we use moisture meters and thermal imaging to identify the wet area before opening drywall â€” so we\'re cutting in the right place, not guessing. This matters because water doesn\'t always pool directly below where it entered. It runs along framing, insulation, and vapor barriers, sometimes several feet from the actual leak source.\n\nAll repairs use materials appropriate to the existing system â€” we don\'t patch copper with push-fit fittings and call it a day. The repair is meant to hold for the life of the home.',
    differentiator: 'We locate the leak before we open the wall. No unnecessary demolition, no guesswork.',
    urgencyNote: 'If your water bill spiked unexpectedly or you hear running water when nothing is on, call us â€” a hidden leak in {{CITY_NAME}} causes serious damage the longer it runs.',
    cta: 'Call for leak detection',
    faqs: [
      {
        q: 'How do you find a hidden leak without tearing up the wall?',
        a: 'We use moisture meters and thermal imaging to identify wet areas behind walls and under floors before opening anything. This lets us cut in the right place and minimize drywall damage.'
      },
      {
        q: 'What are signs I might have a slab leak in my {{CITY_NAME}} home?',
        a: 'Common signs include warm spots on the floor (hot water line), the sound of running water when no fixtures are in use, unexplained increases in your water bill, or cracks appearing in floors or walls. Slab leaks get worse over time â€” call us for a diagnosis.'
      },
      {
        q: 'Can a small leak really cause serious damage?',
        a: 'Yes. A pinhole leak inside a wall can saturate insulation and framing for months before it becomes visible. Mold can begin forming within 24â€“48 hours of moisture exposure in enclosed spaces. Early detection is significantly cheaper than remediation after structural damage.'
      },
      {
        q: 'My water bill jumped this month â€” could it be a leak?',
        a: 'A sudden spike with no change in usage patterns is a common indicator of a hidden leak. Check your meter with all fixtures off â€” if the dial is still moving, water is running somewhere. Call us and we\'ll locate it.'
      },
      {
        q: 'Do you repair the leak after you find it, or just locate it?',
        a: 'We do both. Once we locate the leak, we\'ll quote the repair before opening anything. Our goal is to find it, fix it, and leave the site in good shape â€” not hand you a locating report and leave the repair to someone else.'
      },
    ],
  },
  {
    slug: 'toilet-faucet-repair',
    parentHub: 'plumbing',
    hubSlug: 'plumbing',
    displayName: 'Toilet & Faucet Repair',
    shortName: 'Toilet & Faucet Repair',
    hubLabel: 'Plumbing',
    schemaType: 'Plumber',
    urlPrefix: 'plumbing/toilet-faucet-repair',
    isTopLevel: false,
    tagline: 'Toilet and faucet repair',
    pitch: 'Toilet and faucet repair in {{CITY_NAME}}, KS. Running toilets, dripping faucets, flush valve failures â€” fixed right.',
    serviceBody: 'Running toilets and dripping faucets in {{CITY_NAME}} are more than annoyances â€” a running toilet can waste 200 gallons a day, adding $30â€“$50 to a monthly water bill. Sunflower Plumbing repairs fill valves, flappers, flush valves, and faucet cartridges, and handles toilet and faucet replacements when repair isn\'t the right call. We stock common parts and handle most repairs in a single visit.\n\nHard water in {{COUNTY_NAME}} shortens the life of faucet cartridges and toilet fill valves faster than the national average. Mineral deposits build up in the valve seats and cartridge bodies, causing drips and inconsistent flow. In many cases, a cartridge swap resolves the issue for a fraction of the cost of a full faucet replacement â€” we\'ll tell you which applies.\n\nFor running toilets, the most common causes are a worn flapper, a misadjusted or failed fill valve, or a cracked flush valve seat. We diagnose first, then quote the fix. If a toilet is old enough that repeated repairs are becoming uneconomical, we\'ll tell you that too and can supply and install a new unit.\n\nFor faucet replacements, we can install customer-supplied fixtures or recommend units we carry. We check supply valve condition during every faucet job â€” old angle stop valves that haven\'t been turned in years are a common failure point and can be replaced at the same visit to prevent a future emergency.',
    differentiator: 'No parts-run delays on most common repairs â€” we carry the hardware to fix it the first time.',
    urgencyNote: 'A toilet that won\'t stop running or a faucet dripping overnight adds up fast on your water bill. Usually a quick fix when caught early in {{CITY_NAME}}.',
    cta: 'Call for toilet or faucet repair',
    faqs: [
      {
        q: 'How much water does a running toilet actually waste?',
        a: 'A continuously running toilet typically wastes 200 gallons per day â€” that\'s roughly $15â€“$20 per week added to your water bill depending on your utility rate. Most running toilet repairs cost less than two months of that waste.'
      },
      {
        q: 'Can you fix a dripping faucet same-day in {{CITY_NAME}}?',
        a: 'Usually yes. Most dripping faucets are a cartridge or washer replacement, and we carry common parts. Call (316) 333-6326 and describe your faucet brand â€” we\'ll confirm parts availability before coming out.'
      },
      {
        q: 'How do I know if my toilet needs repair or replacement?',
        a: 'If the toilet is under 15 years old and the issue is a flapper, fill valve, or flush valve, repair almost always makes sense. Older toilets with cracked tanks or bowls, or low-efficiency units wasting water on every flush, are often worth replacing with a current WaterSense model.'
      },
      {
        q: 'Why does my faucet drip more in hard water areas like {{COUNTY_NAME}}?',
        a: 'Hard water deposits build up inside cartridge bodies and valve seats, causing them to wear faster and seal less effectively. If you\'ve replaced the same faucet cartridge more than twice, a full faucet replacement may hold up longer than continued repairs.'
      },
      {
        q: 'Do you check the shutoff valves under the sink when replacing a faucet?',
        a: 'Yes. Old angle stop valves that haven\'t been operated in years frequently fail when turned â€” either they won\'t close, or they leak when reopened. We inspect and can replace them at the same visit before they become an emergency.'
      },
    ],
  },
  {
    slug: 'fixture-replacement',
    parentHub: 'plumbing',
    hubSlug: 'plumbing',
    displayName: 'Fixture Replacement & Installation',
    shortName: 'Fixture Replacement',
    hubLabel: 'Plumbing',
    schemaType: 'Plumber',
    urlPrefix: 'plumbing/fixture-replacement',
    isTopLevel: false,
    tagline: 'Fixture replacement and installation',
    pitch: 'Fixture replacement and installation in {{CITY_NAME}}, KS. Sinks, toilets, showers, tubs â€” supply-and-install or install-only.',
    serviceBody: 'Updating fixtures in your {{CITY_NAME}} home â€” or replacing worn-out originals â€” is a straightforward job when you have the right plumber. Sunflower Plumbing handles sink, toilet, shower, and tub fixture replacements for both residential and light commercial properties. We can supply the fixture or install customer-supplied units.\n\nOlder homes throughout {{COUNTY_NAME}} often have original fixtures that are reaching end of life â€” cast iron tubs with failing enamel, vintage toilets using 3.5+ gallons per flush, or builder-grade faucets installed decades ago. Upgrading fixtures improves function and water efficiency, and modern low-flow toilets and WaterSense faucets can noticeably reduce monthly utility costs.\n\nFor remodel work, we coordinate with tile contractors and finish carpenters to sequence the rough-in and trim-out correctly. Rough plumbing for a bathroom remodel needs to be in the wall before tile goes down â€” and the fixture installation happens after tile and drywall finish. We stay in communication with your project timeline so nothing gets held up waiting on the plumber.\n\nWe also handle bathroom and kitchen supply line upgrades during fixture installations. Original braided steel supply lines corrode over time and are a common source of under-sink leaks. Replacing them during a faucet or toilet install is inexpensive insurance.',
    differentiator: 'Install-only option available if you\'ve already selected your fixtures â€” we connect it correctly and make sure it doesn\'t leak.',
    urgencyNote: 'Fixture upgrades often go smoother when the supply valves are in good shape first. We check them at installation â€” no surprises after the new fixture goes in.',
    cta: 'Call to schedule fixture installation',
    faqs: [
      {
        q: 'Can you install a fixture I already purchased?',
        a: 'Yes â€” install-only is available. Bring your own fixture and we\'ll connect it properly, check for leaks, and make sure the supply valves and drain connections are in good shape. We\'ll flag anything that looks like a problem before we start.'
      },
      {
        q: 'Do you supply fixtures or just install them?',
        a: 'Both. We can supply standard fixtures or install customer-supplied units. For specialty or designer fixtures, it\'s often easier to source your own â€” we\'ll install whatever you\'ve chosen.'
      },
      {
        q: 'How long does a toilet replacement take?',
        a: 'Most toilet replacements are 1â€“2 hours including the shutoff valve check and supply line replacement. If the flange needs repair or the floor has damage from a previous leak, that adds time â€” we\'ll identify that before starting.'
      },
      {
        q: 'What\'s involved in replacing a bathroom sink and faucet?',
        a: 'A basic drop-in sink and faucet swap takes 1â€“2 hours. Undermount sinks and vessel sinks require more coordination with the countertop. We check the drain, P-trap, and shutoff valves at the same time â€” these are common failure points on older systems.'
      },
      {
        q: 'Can you handle fixture installation as part of a larger remodel in {{CITY_NAME}}?',
        a: 'Yes. We coordinate rough-in and trim-out around your tile and drywall schedule. We\'re familiar with the sequencing requirements for bathroom and kitchen remodels and will stay in communication with your project timeline.'
      },
    ],
  },
  {
    slug: 'gas-line-services',
    parentHub: 'plumbing',
    hubSlug: 'plumbing',
    displayName: 'Gas Line Services',
    shortName: 'Gas Line Services',
    hubLabel: 'Plumbing',
    schemaType: 'Plumber',
    urlPrefix: 'plumbing/gas-line-services',
    isTopLevel: false,
    tagline: 'Gas line repair and installation',
    pitch: 'Gas line repair and installation in {{CITY_NAME}}, KS. Licensed gas piping work â€” appliance connections, new lines, leak detection.',
    serviceBody: 'Gas line work in {{CITY_NAME}} requires a licensed plumber â€” and it\'s not a job to delay if you smell gas or suspect a leak. Sunflower Plumbing handles gas line repairs, new gas line runs for appliances and generators, and gas leak detection. If you smell gas, leave the building and call 911 before calling us.\n\nMany homes in {{COUNTY_NAME}} are adding gas appliances â€” outdoor grills, whole-home generators, gas range conversions, and fireplace inserts. Each of these requires a properly sized and permitted gas line run. Undersized lines cause pressure drop and appliance performance issues; oversized runs are wasteful. We size the line correctly based on BTU load and run length.\n\nFor older homes in {{CITY_NAME}}, original black iron gas lines develop corrosion at fittings over decades. A pressure test identifies leaks in the system without visible damage â€” we test before and after any gas work we perform. CSST (corrugated stainless steel tubing) installations from the 1990s and 2000s also require bonding inspection in areas with lightning exposure â€” something commonly overlooked.\n\nAll gas line work is permitted and inspected through the appropriate jurisdiction. We coordinate with the inspection schedule so your appliance connection isn\'t delayed waiting on a final sign-off.',
    differentiator: 'We hold the plumbing license required for gas piping work in Kansas â€” no unlicensed workarounds.',
    urgencyNote: 'If you smell sulfur or rotten eggs anywhere in your home, leave immediately and call 911. Gas leaks are emergencies â€” do not use any switches or open flames.',
    cta: 'Call for gas line service',
    faqs: [
      {
        q: 'Do I need a permit for a new gas line in {{CITY_NAME}}?',
        a: 'Yes, in most cases. New gas line runs and modifications require a permit and inspection in {{COUNTY_NAME}} jurisdictions. We handle the permit coordination â€” you don\'t need to navigate the process yourself.'
      },
      {
        q: 'Can you run a gas line for a generator or outdoor grill?',
        a: 'Yes. We size the line for the BTU load and run length, permit the work, and coordinate the inspection. A properly sized line ensures your generator or appliance runs at full capacity without pressure drop issues.'
      },
      {
        q: 'How do you check for a gas leak?',
        a: 'We perform a pressure test on the gas line system â€” this identifies leaks without requiring visible damage or a gas smell. If a leak is confirmed, we locate the source and repair it before restoring service.'
      },
      {
        q: 'What should I do if I smell gas in my {{CITY_NAME}} home?',
        a: 'Leave immediately without operating any switches or using your phone inside the building. Call 911 from outside. Once the utility has shut off the supply and cleared the building, call us to locate and repair the leak before the gas is restored.'
      },
      {
        q: 'What is CSST and do I need to worry about it?',
        a: 'CSST (corrugated stainless steel tubing) is a flexible gas line installed in many homes from the 1990s onward. It requires proper bonding to prevent lightning-induced arc damage. If your home has CSST and you\'re not sure it\'s bonded, we can inspect and correct it.'
      },
    ],
  },
  {
    slug: 'kitchen-bathroom-plumbing',
    parentHub: 'plumbing',
    hubSlug: 'plumbing',
    displayName: 'Kitchen & Bathroom Plumbing',
    shortName: 'Kitchen & Bathroom Plumbing',
    hubLabel: 'Plumbing',
    schemaType: 'Plumber',
    urlPrefix: 'plumbing/kitchen-bathroom-plumbing',
    isTopLevel: false,
    tagline: 'Kitchen and bathroom plumbing',
    pitch: 'Kitchen and bathroom plumbing in {{CITY_NAME}}, KS. Remodels, repairs, fixture installs, and rough-in for new construction.',
    serviceBody: 'Kitchen and bathroom plumbing in {{CITY_NAME}} covers everything from a remodel rough-in to a single fixture repair. Sunflower Plumbing handles supply line and drain work for kitchen remodels, bathroom renovations, and new additions â€” as well as repairs on existing systems. We coordinate with your contractor or work directly with homeowners on self-managed projects.\n\nKitchen remodels in {{COUNTY_NAME}} often involve relocating the sink, adding an island water line, or replumbing for a new dishwasher and refrigerator ice maker. These jobs require both supply and drain modifications â€” and drain line slope has to be correct or slow drainage becomes a permanent problem. We get the slope right the first time.\n\nBathroom remodels require a plumber at two stages: rough-in before tile, and trim-out after tile. These can\'t be combined â€” the rough-in has to be inspected and the wall closed before the finish work starts. We work with your remodel timeline and won\'t hold up the project.\n\nFor repairs on existing kitchen and bathroom plumbing, we handle everything from a leaking garbage disposal connection to a supply line burst under the sink. We stock common repair parts and handle most jobs same-day. If the issue involves the drain stack or supply main inside the wall, we\'ll camera or pressure test to confirm before opening anything.',
    differentiator: 'We do both rough-in and finish plumbing â€” no need to coordinate two separate plumbers at different project phases.',
    urgencyNote: 'Remodel timelines depend on plumbing. Book early â€” kitchen and bathroom rough-in slots in {{CITY_NAME}} fill up faster than most homeowners expect.',
    cta: 'Call to schedule kitchen or bathroom plumbing',
    faqs: [
      {
        q: 'Do I need a plumber for a kitchen remodel in {{CITY_NAME}}?',
        a: 'If you\'re moving or adding any plumbing â€” sink relocation, island supply line, dishwasher rough-in â€” yes, a licensed plumber is required. Even swapping a sink in place benefits from a professional connection to avoid drain leaks and supply line failures.'
      },
      {
        q: 'When does the plumber come in during a bathroom remodel?',
        a: 'Twice. Rough-in happens before tile and drywall â€” supply and drain lines are set in the wall and floor. Trim-out happens after tile and drywall finish â€” fixtures are installed and connected. We coordinate both visits around your remodel schedule.'
      },
      {
        q: 'Can you move a sink or toilet to a different location in the bathroom?',
        a: 'Yes. Moving a toilet or sink requires relocating both the supply line and the drain, which may involve cutting the subfloor to reposition the drain connection. We scope the job first so you know what\'s involved before work starts.'
      },
      {
        q: 'My garbage disposal is leaking under the sink â€” can you fix it same-day?',
        a: 'Usually yes. Garbage disposal leaks are typically a failed sink flange seal, a cracked housing, or a loose drain connection â€” most of which we can repair or replace same-day. Call (316) 333-6326 to schedule.'
      },
      {
        q: 'How long does a bathroom rough-in take for a remodel?',
        a: 'A standard bathroom rough-in takes 4-6 hours depending on how much relocation is involved. New additions with long drain runs take longer. We will give you a time estimate when we scope the job.',
      },
    ],
  },
  {
    slug: 'water-softener-installation',
    parentHub: 'plumbing',
    hubSlug: 'plumbing',
    displayName: 'Water Softener Installation',
    shortName: 'Water Softener Installation',
    hubLabel: 'Plumbing',
    schemaType: 'Plumber',
    urlPrefix: 'plumbing/water-softener-installation',
    isTopLevel: false,
    tagline: 'Water softener installation and service',
    pitch: 'Water softener installation in {{CITY_NAME}}, KS. Hard water solutions for Butler County homes â€” professional installation, no DIY guesswork.',
    serviceBody: 'Hard water is a real issue in {{CITY_NAME}} and throughout Kansas. Scale buildup damages water heaters, shortens appliance life, and leaves spots on everything it touches. Sunflower Plumbing installs water softeners and filtration systems with proper bypass valve configuration, drain connections, and startup testing â€” so the system actually works when we leave.\n\nKansas water hardness varies by source, but most municipal water in {{COUNTY_NAME}} runs between 15 and 25 grains per gallon â€” classified as very hard. Well water in rural {{CITY_NAME}} areas often runs even harder. At those levels, water heater efficiency drops measurably within two to three years without a softener, and scale accumulation in appliances, showerheads, and faucets becomes a constant maintenance issue.\n\nA proper water softener installation includes a correctly sized bypass valve, a dedicated drain line run to a floor drain or standpipe, and a brine tank positioned for accessible salt loading. DIY and big-box installations frequently skip the bypass valve or drain line details, which causes problems when the softener needs service or regenerates incorrectly.\n\nWe also install whole-house filtration for sediment, iron, or sulfur issues common in well water systems throughout rural {{COUNTY_NAME}}. If you are on a well and dealing with staining, odor, or taste issues, a filtration system upstream of the softener is typically the right solution.',
    differentiator: 'Proper bypass valve installation and drain line configuration â€” details that get skipped on DIY and big-box installs.',
    urgencyNote: 'Hard water in Kansas shortens water heater life significantly. A water softener installation often pays for itself in reduced appliance wear.',
    cta: 'Call to schedule water softener installation',
    faqs: [
      {
        q: 'How do I know if I need a water softener in {{CITY_NAME}}?',
        a: 'Signs include white scale buildup on faucets and showerheads, soap that will not lather well, spotty dishes from the dishwasher, or a water heater that is failing prematurely. Most municipal water in {{COUNTY_NAME}} runs 15-25 grains per gallon â€” classified as very hard. A water softener provides measurable appliance protection at those levels.',
      },
      {
        q: 'How hard is the water in {{COUNTY_NAME}}?',
        a: 'Most municipal water in {{COUNTY_NAME}} runs 15-25 grains per gallon â€” classified as very hard. Well water in rural areas often runs harder. At these levels, a water softener provides measurable appliance protection and noticeably reduces scale buildup throughout the home.',
      },
      {
        q: 'Can I install a water softener myself?',
        a: 'The softener unit itself is manageable for DIY, but a proper installation requires a correctly sized bypass valve, a dedicated drain line, and brine tank positioning for service access. Skipping these details causes regeneration failures and makes future service difficult. Professional installation ensures it works correctly from day one.',
      },
      {
        q: 'Do you install whole-house water filtration as well as softeners?',
        a: 'Yes. For well water with iron, sediment, or sulfur issues, we install filtration upstream of the softener. The combination handles both hardness and contaminant issues. We will recommend the right configuration based on your water source and any symptoms you are experiencing.',
      },
      {
        q: 'How long does a water softener installation take?',
        a: 'Most water softener installations take 2-3 hours including bypass valve, drain line, and startup testing. Adding a whole-house filtration system extends the job by 1-2 hours depending on where the filter housing needs to be positioned.',
      },
    ],
  },
  {
    slug: 'sewer-line-repair',
    parentHub: 'plumbing',
    hubSlug: 'plumbing',
    displayName: 'Sewer Line Repair & Replacement',
    shortName: 'Sewer Line Repair',
    hubLabel: 'Plumbing',
    schemaType: 'Plumber',
    urlPrefix: 'plumbing/sewer-line-repair',
    isTopLevel: false,
    tagline: 'Sewer line repair and replacement',
    pitch: 'Sewer line repair and replacement in {{CITY_NAME}}, KS. Camera inspection, targeted repair, or full replacement â€” handled in-house.',
    serviceBody: 'Sewer line problems in {{CITY_NAME}} show up as slow drains, sewage backup, or unexplained wet spots in the yard. Sunflower Plumbing camera inspects the line to find the exact failure point â€” root intrusion, pipe collapse, joint separation â€” then repairs or replaces only what is necessary. We handle the excavation in-house, so there is no split scope between contractors.\n\nHomes in {{COUNTY_NAME}} built before 1980 typically have clay tile or Orangeburg sewer lines. Clay tile fails through root intrusion at the joints; Orangeburg delaminates and collapses over time. A camera inspection determines the extent of the damage and whether a targeted repair or full replacement makes more sense financially.\n\nFor targeted repairs â€” a section of root intrusion or a single joint failure â€” we excavate precisely over the failed section, repair or replace it, and backfill. For full line replacements, we trench the full run from the house to the main, install new PVC, and restore grade. Both approaches are handled in-house without subcontractor coordination.\n\nSewage backup into the home is a health hazard. Multiple slow-draining fixtures or gurgling sounds in the toilet when you run the sink are early warning signs. A camera inspection is a non-destructive first step â€” you will know exactly what is wrong before any ground is opened.',
    differentiator: 'Camera inspection first. We find the problem before opening the ground â€” no exploratory digging.',
    urgencyNote: 'Sewage backup into the home is a health hazard. If multiple fixtures are backing up simultaneously in {{CITY_NAME}}, call us immediately.',
    cta: 'Call for sewer line service',
    faqs: [
      {
        q: 'How do I know if my sewer line is damaged or just clogged?',
        a: 'A camera inspection tells us definitively. If snaking clears the drain but the problem returns within weeks, it is usually structural â€” root intrusion, a belly in the line, or pipe collapse. A camera run identifies the cause so you know what you are dealing with before deciding how to fix it.',
      },
      {
        q: 'What type of sewer pipe does my {{CITY_NAME}} home likely have?',
        a: 'Homes built before 1960 often have clay tile. Homes from the 1960s through 1980s may have Orangeburg â€” a bituminous fiber pipe that deteriorates over time â€” or early PVC. Post-1980 construction is typically PVC throughout. A camera inspection confirms what you have and its current condition.',
      },
      {
        q: 'Can you repair just a section of the sewer line, or does it all need to be replaced?',
        a: 'We repair only what has failed whenever possible. A targeted excavation over a single failed joint or root intrusion section is significantly less expensive than a full line replacement. Camera inspection tells us exactly where the failure is so we open the ground in the right spot.',
      },
      {
        q: 'How long does a sewer line replacement take in {{CITY_NAME}}?',
        a: 'A full sewer line replacement from house to street typically takes one to two days depending on depth, soil conditions, and run length. We handle permits, excavation, pipe installation, backfill, and compaction â€” everything in-house.',
      },
      {
        q: 'Do you handle the excavation or do you subcontract it?',
        a: 'We handle excavation in-house. This matters because the same crew doing the pipe work is operating the equipment â€” there is no coordination gap between the excavator and the plumber, and accountability is clear throughout the job.',
      },
    ],
  },
  {
    slug: 'septic-services',
    parentHub: 'septic',
    hubSlug: 'septic',
    displayName: 'Septic Services',
    shortName: 'Septic Services',
    hubLabel: 'Septic',
    schemaType: 'LocalBusiness',
    urlPrefix: 'septic',
    isTopLevel: true,
    tagline: 'Full-service septic care',
    pitch: 'Septic services in {{CITY_NAME}}, KS. Inspection, repair, and system maintenance for rural and residential properties.',
    serviceBody: 'Septic systems on {{CITY_NAME}} properties need regular attention to function correctly â€” and when they fail, they fail badly. Sunflower Plumbing handles septic inspections, distribution box repairs, lateral field assessments, and full system replacements. We also handle the excavation in-house, so septic work does not require two contractors.\n\nRural properties throughout {{COUNTY_NAME}} rely on septic systems rather than municipal sewer. These systems require periodic pumping â€” typically every 3-5 years â€” inspection of the distribution box and outlet baffle, and monitoring of the lateral field for signs of saturation. Most homeowners do not think about their septic system until something fails, and by then the repair is usually more extensive than it needed to be.\n\nSigns of a failing septic system include slow drains throughout the house, sewage odor near the tank or field area, lush grass growing directly over the lateral field lines, or wet ground that does not dry up between rain events. Any of these warrant an inspection before the system backs up into the home.\n\nFor system replacements, we design, permit, and install to KDHE specifications and {{COUNTY_NAME}} requirements. Soil assessment determines the correct lateral field sizing and placement â€” a step that cannot be skipped. We handle the full scope from permitting through final inspection.',
    differentiator: 'We handle both the plumbing connections and the excavation â€” one contractor, full scope, one point of accountability.',
    urgencyNote: 'A septic system showing signs of failure needs attention before it becomes a full backup. Surfacing sewage is a health code violation â€” call us.',
    cta: 'Call for septic service',
    faqs: [
      {
        q: 'How often should I have my septic system pumped in {{CITY_NAME}}?',
        a: 'The standard recommendation is every 3-5 years depending on household size and tank capacity. Smaller tanks or larger households need more frequent pumping. We can assess your system and give you a realistic schedule based on what we find.',
      },
      {
        q: 'What are signs my septic system is failing?',
        a: 'Slow drains throughout the house â€” not just one fixture â€” sewage smell near the tank or lateral field, unusually green grass over the field lines, or wet ground that does not dry between rains. Any of these signal a problem â€” call us before it backs up into the home.',
      },
      {
        q: 'Do you handle septic permits in {{COUNTY_NAME}}?',
        a: 'Yes. New systems and replacement systems require permits through KDHE and the local county. We handle permit applications, soil assessments, and coordinate the required inspections â€” you do not have to navigate the process yourself.',
      },
      {
        q: 'Can a septic system be repaired, or does it need to be replaced?',
        a: 'It depends on what has failed. Distribution boxes, outlet baffles, and individual lateral lines can often be repaired or replaced without replacing the entire system. If the tank has structural failure or the entire field is saturated, a full replacement is typically necessary. We inspect before recommending.',
      },
      {
        q: 'How long does a septic system replacement take?',
        a: 'A full septic system replacement â€” tank, distribution box, and lateral field â€” typically takes 2-3 days from excavation start to backfill completion, depending on soil conditions and system size. Permitting and soil evaluation happen before we start, so there are no delays once excavation begins.',
      },
    ],
  },
  {
    slug: 'lateral-field-installation',
    parentHub: 'septic',
    hubSlug: 'septic',
    displayName: 'Lateral Field Installation',
    shortName: 'Lateral Field Installation',
    hubLabel: 'Septic',
    schemaType: 'LocalBusiness',
    urlPrefix: 'septic/lateral-field-installation',
    isTopLevel: false,
    tagline: 'Septic lateral field installation and replacement',
    pitch: 'Lateral field installation and replacement in {{CITY_NAME}}, KS. Permitted, inspected, and built to KDHE spec.',
    serviceBody: 'Lateral field replacement in {{CITY_NAME}} is a full excavation and permitting project â€” not something to patch or delay. Sunflower Plumbing designs, permits, excavates, and installs lateral fields to KDHE specifications and {{COUNTY_NAME}} requirements. We handle the full scope from soil assessment through final inspection.\n\nThe lateral field is the most failure-prone component of a septic system. Over time, biomat â€” a layer of biological material â€” accumulates in the soil around the lateral lines and restricts drainage. Once the field is saturated and no longer absorbing effluent, the system backs up. A fully failed field requires replacement.\n\nSoil conditions in {{COUNTY_NAME}} directly affect lateral field design. Clay-heavy soils have lower percolation rates than sandy soils, which requires a longer field run or an alternative system design. A percolation test determines the soil absorption rate, which drives the field sizing calculation. Undersized fields fail prematurely â€” getting the soil assessment right at the design stage is critical.\n\nKDHE requires permits for all new lateral field installations and replacements. We handle the permit application, schedule the required inspections, and ensure the system is installed to spec before the field is covered.',
    differentiator: 'Full scope in-house: system design, permit coordination, excavation, installation, and inspection. No subcontractor coordination.',
    urgencyNote: 'A saturated lateral field will not recover on its own. If the ground over your field is wet or sewage is surfacing in {{CITY_NAME}}, you need a field assessment now.',
    cta: 'Call for lateral field assessment',
    faqs: [
      {
        q: 'How do I know if my lateral field has failed?',
        a: 'Wet ground that does not dry between rain events, lush grass directly over the field lines, sewage smell in the yard, or slow drains throughout the house all point to field saturation. A field inspection confirms it â€” call us before the system backs up into the home.',
      },
      {
        q: 'Can a failed lateral field be repaired, or does it need to be replaced?',
        a: 'In most cases, a fully saturated field needs replacement rather than repair. Resting the field sometimes temporarily restores partial function in marginal cases, but a failed biomat layer does not recover on its own. We will inspect and tell you honestly what you are dealing with.',
      },
      {
        q: 'What is a perc test and do I need one for a new lateral field in {{COUNTY_NAME}}?',
        a: 'A percolation test measures how quickly your soil absorbs water. It is required by KDHE for new lateral field installations and drives the field sizing calculation. Clay-heavy soils in {{COUNTY_NAME}} absorb slowly, which typically means a longer field run. We handle the perc test as part of the permit process.',
      },
      {
        q: 'How long does a lateral field replacement take?',
        a: 'Excavation and installation typically takes 1-2 days for a standard residential field. Permitting and soil evaluation happen beforehand so there are no delays once work starts. KDHE inspection is scheduled after installation before the field is covered.',
      },
      {
        q: 'Do you handle the KDHE permit for a lateral field in {{CITY_NAME}}?',
        a: 'Yes. We handle the full permit application, perc test coordination, and inspection scheduling. You do not need to deal with KDHE directly â€” we manage the process from design through final approval.',
      },
    ],
  },
  {
    slug: 'excavation',
    parentHub: 'excavation',
    hubSlug: 'excavation',
    displayName: 'Excavation Services',
    shortName: 'Excavation',
    hubLabel: 'Excavation',
    schemaType: 'LocalBusiness',
    urlPrefix: 'excavation',
    isTopLevel: true,
    tagline: 'Licensed excavation contractor',
    pitch: 'Excavation services in {{CITY_NAME}}, KS. Utility trenching, septic excavation, site prep â€” licensed plumber on every job.',
    serviceBody: 'Sunflower Plumbing\'s excavation services in {{CITY_NAME}} cover the full range of residential and commercial excavation needs â€” from utility trenching and septic system work to site preparation and foundation backfill. As a licensed plumber who also operates excavation equipment, we handle jobs that require both in a single scope without subcontractor coordination.\n\nMost excavation contractors in {{COUNTY_NAME}} can open the ground â€” but they stop at the pipe connections. Sunflower Plumbing holds a Kansas plumbing license, which means the same contractor who digs the trench can legally connect the pipe. This matters for sewer and water line work, septic installations, and gas line runs â€” jobs where the excavation and the plumbing are inseparable.\n\nClay-dominant soils throughout {{COUNTY_NAME}} require proper excavation and backfill technique. Clay holds water, swells, and creates lateral pressure against buried structures. Trench backfill needs to be compacted in lifts to prevent settling that damages buried lines over time. We backfill correctly because we are responsible for the pipe inside the trench.\n\nAll excavation work begins with an 811 call. Underground utility marking in {{CITY_NAME}} is required by Kansas law, and as-built utility records in older neighborhoods are often inaccurate. We proceed carefully even after markings are in place.',
    differentiator: 'Licensed plumber operating the excavation equipment â€” the only contractor who can legally do the dig and the pipe connections on the same job.',
    urgencyNote: 'Excavation emergencies â€” collapsed lines, surfacing sewage â€” require immediate response. We are available 24/7 in {{CITY_NAME}}.',
    cta: 'Call for excavation service',
    faqs: [
      {
        q: 'Why does it matter if my excavation contractor has a plumbing license?',
        a: 'In Kansas, connecting water, sewer, or gas lines requires a licensed plumber. If your excavation contractor cannot legally make the pipe connections, you need two contractors on the job â€” which adds cost, coordination delays, and accountability gaps. We hold the license and operate the equipment, so one crew handles both.',
      },
      {
        q: 'Do you call 811 before you dig in {{CITY_NAME}}?',
        a: 'Yes, always. Kansas law requires utility notification before any excavation. We submit the 811 request and wait for marking before starting. In older {{COUNTY_NAME}} neighborhoods where as-built records are sometimes inaccurate, we also proceed carefully after markings are confirmed.',
      },
      {
        q: 'What types of excavation projects do you handle?',
        a: 'Sewer and water line excavation, septic system installation and replacement, utility trenching, site preparation, foundation backfill, and emergency excavation for failed lines. Call us with your project details and we will scope it.',
      },
      {
        q: 'How do clay soils in {{COUNTY_NAME}} affect excavation and backfill?',
        a: 'Clay swells when wet and creates lateral pressure against buried structures. Trench backfill in clay soils needs to be compacted in lifts â€” not pushed in all at once â€” to prevent settling that shifts or damages buried lines. We backfill correctly because we are responsible for what is inside the trench.',
      },
      {
        q: 'Do you handle emergency excavation in {{CITY_NAME}}?',
        a: 'Yes â€” 24/7. Collapsed sewer lines, failed water mains, and surfacing septic systems cannot wait. We are based in El Dorado, so response times throughout {{COUNTY_NAME}} are faster than contractors dispatching from Wichita.',
      },
    ],
  },
  {
    slug: 'sewer-water-line-excavation',
    parentHub: 'excavation',
    hubSlug: 'excavation',
    displayName: 'Sewer & Water Line Excavation',
    shortName: 'Sewer & Water Line Excavation',
    hubLabel: 'Excavation',
    schemaType: 'LocalBusiness',
    urlPrefix: 'excavation/sewer-water-line-excavation',
    isTopLevel: false,
    tagline: 'Sewer and water line excavation',
    pitch: 'Sewer and water line excavation in {{CITY_NAME}}, KS. One contractor handles the dig and the pipe connections â€” no split scope.',
    serviceBody: 'Sewer and water line excavation in {{CITY_NAME}} requires both heavy equipment and a plumbing license â€” and Sunflower Plumbing brings both. We excavate, repair or replace the line, and backfill and compact â€” all in-house. No waiting on a second contractor to connect what the excavator opened.\n\nOlder neighborhoods in {{COUNTY_NAME}} have sewer and water lines that are decades past their intended service life. Clay tile sewer lines develop root intrusion and joint failure. Original galvanized water service lines corrode and fail. When the line goes, the only reliable fix is excavation and replacement.\n\nWe camera inspect sewer lines before opening the ground whenever possible. This identifies the exact failure location â€” a targeted excavation over a single failed joint costs a fraction of a full trench. For water line failures, we pressure test the system to isolate the leak location before digging.\n\nBackfill and compaction are done in lifts to prevent ground settlement that puts stress on the new pipe over time. We restore the surface to grade after backfill â€” your yard is left level, not with a settling mound.',
    differentiator: 'We call 811 before every dig. In {{COUNTY_NAME}}\'s older neighborhoods, as-built utility records are often inaccurate â€” we proceed carefully even after marking.',
    urgencyNote: 'A broken water main or collapsed sewer is an emergency. We respond 24/7 throughout {{CITY_NAME}} and {{COUNTY_NAME}}.',
    cta: 'Call for sewer or water line excavation',
    faqs: [
      {
        q: 'How do you find exactly where a sewer line has failed in {{CITY_NAME}}?',
        a: 'We run a camera down the line to locate the failure before opening the ground. This lets us excavate precisely over the failed section rather than trenching the full run. For water lines, we use a pressure test to isolate the leak location.',
      },
      {
        q: 'Can you repair just a section of the line, or does the whole thing need to come out?',
        a: 'We repair only what has failed. A targeted excavation over a single failed joint or root intrusion section is significantly less disruptive and expensive than a full replacement. Camera inspection tells us what we are dealing with before we open anything.',
      },
      {
        q: 'What material do you use for sewer and water line replacements?',
        a: 'PVC for sewer lines and copper or PEX for water service lines. PVC is the current standard for buried drain lines â€” it is durable, root-resistant at the joints, and does not corrode. We size the line correctly for the application and depth.',
      },
      {
        q: 'How long does a sewer or water line excavation take?',
        a: 'A targeted repair over a single failure point typically takes one day. A full line replacement from house to street takes one to two days depending on depth, length, and soil conditions. We handle permits, excavation, pipe installation, backfill, and compaction in-house.',
      },
      {
        q: 'What happens to my yard after the excavation?',
        a: 'We backfill in compacted lifts and restore the surface to grade. The trench area will be level when we leave. Surface restoration beyond grading â€” sod, landscaping â€” is the homeowner\'s responsibility.',
      },
    ],
  },
  {
    slug: 'septic-system-excavation',
    parentHub: 'excavation',
    hubSlug: 'excavation',
    displayName: 'Septic System Excavation',
    shortName: 'Septic System Excavation',
    hubLabel: 'Excavation',
    schemaType: 'LocalBusiness',
    urlPrefix: 'excavation/septic-system-excavation',
    isTopLevel: false,
    tagline: 'Septic tank and field excavation',
    pitch: 'Septic system excavation in {{CITY_NAME}}, KS. Tank installs, field excavation, and full system replacement â€” permitted and inspected.',
    serviceBody: 'Septic system excavation in {{CITY_NAME}} involves careful coordination of soil conditions, KDHE permit requirements, and proper tank and field placement. Sunflower Plumbing handles the full scope â€” tank excavation, bed and set, lateral field trenching, distribution box installation, and final inspection â€” without splitting the job between a plumber and a separate excavator.\n\nInstalling or replacing a septic system in {{COUNTY_NAME}} starts with a soil evaluation and percolation test. Clay-heavy soils in {{COUNTY_NAME}} absorb at lower rates than sandy soils, which affects field sizing. Undersizing the lateral field because of an inadequate soil assessment is the most common cause of premature field failure. We do the soil work correctly at the design stage.\n\nThe excavation itself covers four main areas: the tank hole, the distribution box, the lateral field trenches, and the connection trench back to the house. Lateral field lines have to be level or slightly pitched within tight tolerances for even effluent distribution. Improperly graded laterals saturate sections of the field ahead of schedule.\n\nKDHE inspection happens after installation and before backfill. We schedule the inspection and coordinate with the inspector â€” the field does not get covered until it passes.',
    differentiator: 'One contractor for the full system. We hold the plumbing license and operate the equipment â€” no coordination gap between trades.',
    urgencyNote: 'Septic failures need immediate attention. Surfacing sewage is a health code violation and an environmental hazard in {{CITY_NAME}} â€” do not wait.',
    cta: 'Call for septic excavation',
    faqs: [
      {
        q: 'Do I need a permit for a septic system installation in {{COUNTY_NAME}}?',
        a: 'Yes â€” all new septic systems and replacements require KDHE permits and local county approval. We handle permit applications, coordinate the required soil evaluation, and schedule inspections. You do not have to navigate the permit process yourself.',
      },
      {
        q: 'How deep are septic tanks typically buried in {{CITY_NAME}}?',
        a: 'Septic tanks in Kansas are typically buried 18-36 inches below grade depending on soil conditions and frost depth. Proper burial depth protects the tank from freeze-thaw damage while keeping the access lid accessible for pumping. We set tanks to the correct depth for your site.',
      },
      {
        q: 'What is involved in a full septic system replacement vs. just the lateral field?',
        a: 'A full system replacement includes the tank, distribution box, and lateral field. If the tank is still structurally sound and the only failure is in the field, we sometimes replace just the field. A site inspection determines what has actually failed so we do not replace components that do not need it.',
      },
      {
        q: 'How long does a septic system excavation take?',
        a: 'A full system installation typically takes 2-3 days from excavation start through backfill after inspection. Permitting and soil evaluation happen before we mobilize equipment, so there are no delays once we are on-site.',
      },
      {
        q: 'Why does even distribution in the lateral field matter?',
        a: 'If lateral field lines are not level within tight tolerances, effluent distributes unevenly â€” saturating some sections while others receive nothing. Unevenly loaded fields fail at the saturated sections ahead of schedule. We grade the trenches correctly at installation so the field loads evenly throughout its life.',
      },
    ],
  },
  {
    slug: 'trenching',
    parentHub: 'excavation',
    hubSlug: 'excavation',
    displayName: 'Trenching Services',
    shortName: 'Trenching',
    hubLabel: 'Excavation',
    schemaType: 'LocalBusiness',
    urlPrefix: 'excavation/trenching',
    isTopLevel: false,
    tagline: 'Utility and drainage trenching',
    pitch: 'Trenching services in {{CITY_NAME}}, KS. Utility lines, septic laterals, drainage, and outbuilding runs â€” 811 marked, properly backfilled.',
    serviceBody: '{{COUNTY_NAME}}\'s clay-dominant soils require proper trenching technique â€” the right equipment, correct depth, and compacted backfill to prevent settling that can damage buried lines over time. Sunflower Plumbing handles utility trenching, septic lateral field trenching, French drain installation, and outbuilding utility runs throughout {{CITY_NAME}} and surrounding areas.\n\nTrenching in clay soils is different from sandy or loam conditions. Clay holds its shape during excavation but swells when wet and can shift over time. Trench walls in deeper excavations may require shoring depending on depth and soil stability. We assess trench conditions before any personnel enter an excavation and follow OSHA requirements throughout.\n\nBackfill is where trenching jobs frequently fail. Pushing all the excavated material back in at once leaves air pockets and unstable material that settles for months â€” sometimes years. We backfill in compacted lifts, using a plate compactor on shallow trenches and a jumping jack on deeper runs. This is especially important for trench runs under driveways or pavement.\n\nFor outbuilding water and electrical conduit runs, we trench to the correct burial depth for the utility type â€” electrical conduit, water line, and communication lines each have different minimum burial depth requirements. We get the depths right at installation so the system passes inspection and the lines are protected.',
    differentiator: '811 called before every dig. Backfilled and compacted in lifts â€” we do not leave a settling trench that shifts your buried lines a year later.',
    urgencyNote: 'Kansas law requires 811 notification before any excavation. We handle the notification and wait for marking before starting every job in {{CITY_NAME}}.',
    cta: 'Call for trenching service',
    faqs: [
      {
        q: 'Do you call 811 before trenching in {{CITY_NAME}}?',
        a: 'Yes â€” every time, without exception. Kansas law requires utility notification before any excavation. We submit the request and wait for markings before starting. In older {{COUNTY_NAME}} neighborhoods where utility records can be inaccurate, we proceed carefully even after markings are confirmed.',
      },
      {
        q: 'How deep do you trench for a water line in Kansas?',
        a: 'Water lines in Kansas should be buried at least 42 inches below grade to get below the frost line. Shallower burial risks freeze-up in hard winters. We trench to the correct depth every time â€” a frozen water line is an emergency that costs far more than doing it right the first time.',
      },
      {
        q: 'Why does backfill compaction matter after trenching?',
        a: 'Uncompacted backfill settles over time â€” sometimes significantly. Settlement creates low spots in the yard, can crack or shift buried lines, and causes trench runs under driveways or pavement to fail. Compacting in lifts prevents this. It takes more time but eliminates the call-backs.',
      },
      {
        q: 'Can you trench for an outbuilding water line or electrical conduit in {{CITY_NAME}}?',        a: 'Yes. We trench to the correct depth for each utility type and backfill correctly. Call us with the run length and what you are running â€” water line, electrical conduit, or communication cable â€” and we will give you a scope and price.',
      },
      {
        q: 'What is a French drain and can you install one in {{CITY_NAME}}?',
        a: 'A French drain is a gravel-filled trench with a perforated pipe that redirects groundwater away from a structure or wet area. We install French drains for basement drainage, foundation waterproofing, and yard drainage problems throughout {{COUNTY_NAME}}.',
      },
    ],
  },
  {
    slug: 'site-preparation',
    parentHub: 'excavation',
    hubSlug: 'excavation',
    displayName: 'Site Preparation',
    shortName: 'Site Preparation',
    hubLabel: 'Excavation',
    schemaType: 'LocalBusiness',
    urlPrefix: 'excavation/site-preparation',
    isTopLevel: false,
    tagline: 'Site prep and rough grading',
    pitch: 'Site preparation in {{CITY_NAME}}, KS. Land clearing, rough grading, and utility rough-in for new construction and additions.',
    serviceBody: 'Site preparation in {{CITY_NAME}} requires attention to drainage grading â€” particularly with {{COUNTY_NAME}}\'s clay soils, which hold water and can undermine building pads when drainage is not properly established. Sunflower Plumbing handles land clearing, rough grading, building pad excavation, and utility rough-in as a coordinated scope â€” so your builder arrives to a ready site.\n\nFor new construction in {{COUNTY_NAME}}, the site preparation sequence matters. Utility rough-in â€” sewer, water, and gas stub-outs â€” needs to happen before the building pad is graded and compacted. Running utilities after pad prep means cutting back into compacted soil, which adds time and cost. We coordinate the sequencing so utilities are in the right place before grade is established.\n\nDrainage grading in clay soils requires more attention than in sandy or loam areas. Clay does not absorb water quickly, so surface drainage has to move water away from the building footprint efficiently. Poor drainage around a foundation shows up as wet basements, foundation wall pressure, and long-term structural issues. We grade with long-term drainage performance in mind, not just enough slope to pass the initial inspection.\n\nFor lot preparation on rural {{CITY_NAME}} properties, we handle tree and brush clearing, topsoil stripping, rough grading, and access road establishment â€” everything needed to get a site ready for foundation work.',
    differentiator: 'We coordinate utility rough-in with site grading â€” one mobilization covers both instead of scheduling two contractors separately.',
    urgencyNote: 'Remodel and new construction timelines are tight. Book site prep early â€” excavation slots in {{CITY_NAME}} fill ahead of foundation pours.',
    cta: 'Call for site preparation',
    faqs: [
      {
        q: 'When should site preparation happen in the construction sequence?',
        a: 'Site prep â€” including utility rough-in, rough grading, and building pad establishment â€” needs to happen before foundation work starts. Utility stubs should be in place before the pad is compacted. We coordinate the sequencing so nothing needs to be cut back into after grade is set.',
      },
      {
        q: 'Do you handle tree and brush clearing in {{CITY_NAME}}?',
        a: 'Yes. We handle clearing, topsoil stripping, rough grading, and access establishment as part of site preparation. For heavily wooded lots, we can provide a scope after a site visit.',
      },
      {
        q: 'Why does drainage grading matter more in {{COUNTY_NAME}} clay soils?',
        a: 'Clay absorbs water slowly. If the grade around a building does not move surface water away efficiently, it pools against the foundation â€” creating hydrostatic pressure, wet basements, and long-term structural problems. We grade for long-term drainage performance, not just initial slope.',
      },
      {
        q: 'Can you handle site prep for an addition to an existing home?',
        a: 'Yes. Additions often require utility extensions â€” sewer, water, gas, and electrical conduit rough-in â€” coordinated with the foundation excavation. We handle the excavation and utility rough-in so your foundation contractor arrives to a ready site.',
      },
      {
        q: 'How long does site preparation take for a new construction project in {{CITY_NAME}}?',
        a: 'It depends on lot size, clearing requirements, and utility run lengths. A straightforward residential lot typically takes 1-2 days for rough grading and utility rough-in. We will give you a timeline estimate after reviewing the site or plans.',
      },
    ],
  },
  {
    slug: 'backfill-grading',
    parentHub: 'excavation',
    hubSlug: 'excavation',
    displayName: 'Backfill & Grading',
    shortName: 'Backfill & Grading',
    hubLabel: 'Excavation',
    schemaType: 'LocalBusiness',
    urlPrefix: 'excavation/backfill-grading',
    isTopLevel: false,
    tagline: 'Foundation backfill and drainage grading',
    pitch: 'Backfill and grading in {{CITY_NAME}}, KS. Foundation backfill, drainage correction, and lot leveling â€” compacted to prevent settling.',
    serviceBody: 'Drainage problems on {{CITY_NAME}} properties frequently trace back to improperly compacted backfill or grading that slopes toward the foundation rather than away from it. {{COUNTY_NAME}}\'s clay soils make this worse â€” clay swells when wet and creates lateral pressure against foundation walls. Sunflower Plumbing grades to direct water away from structures and backfills in properly compacted lifts to prevent long-term settling.\n\nFoundation backfill is one of the most commonly rushed steps in construction. The excavated material gets pushed back in quickly, without compaction, and within a few seasons the grade around the foundation has settled and water is running toward the building instead of away from it. Correcting negative grade after the fact is disruptive and expensive â€” doing it correctly at backfill is straightforward.\n\nFor drainage correction on established properties in {{CITY_NAME}}, we assess where water is pooling or running toward the structure and regrade to redirect it. This sometimes involves bringing in select fill material â€” not all native clay is suitable for backfill, particularly when it has been mixed with organic material from topsoil stripping.\n\nLot leveling for properties with uneven terrain or settled areas involves cutting high spots and filling low spots with compacted material. We bring the lot to a consistent grade that drains correctly and provides a stable surface for whatever comes next â€” lawn, landscaping, or pavement.',
    differentiator: 'We grade with long-term drainage in mind â€” not just enough slope to pass an inspection on day one.',
    urgencyNote: 'Negative grade around a foundation gets worse every wet season in {{CITY_NAME}}. Correcting it early is significantly cheaper than addressing foundation damage later.',
    cta: 'Call for backfill or grading service',
    faqs: [
      {
        q: 'What is negative grade and why is it a problem?',
        a: 'Negative grade means the ground slopes toward the foundation rather than away from it. Water running toward the foundation creates hydrostatic pressure against the wall, wet basements, and over time, structural damage. It is a common problem on homes where backfill was not properly compacted at construction.',
      },
      {
        q: 'How do you correct drainage problems around a foundation in {{CITY_NAME}}?',
        a: 'We regrade the area around the foundation to establish positive drainage â€” at least 6 inches of drop over the first 10 feet away from the structure. Sometimes this involves bringing in select fill material to build up low areas before regrading. We assess the situation before recommending a scope.',
      },
      {
        q: 'Does {{COUNTY_NAME}} clay soil cause extra problems for backfill?',
        a: 'Yes. Clay swells when wet and shrinks when dry, creating movement that can shift foundation walls and settle buried utilities. Proper backfill in clay soils means compacting in lifts â€” typically 6-8 inch lifts â€” using a compactor, not just pushing material back in with the bucket.',
      },
      {
        q: 'Can you level a lot or yard in {{CITY_NAME}} for drainage or aesthetic reasons?',
        a: 'Yes. Lot leveling involves cutting high spots, filling low spots with compacted material, and establishing a consistent grade that drains correctly. We handle both drainage-driven leveling and preparation for lawn or landscaping projects.',
      },
      {
        q: 'What kind of fill material do you use for backfill and grading?',
        a: 'We use compactable fill appropriate to the application â€” typically granular fill or select native material free from organic debris. We avoid using topsoil or material with high organic content for structural backfill, as organic material decomposes and causes settling over time.',
      },
    ],
  },
  {
    slug: 'emergency-excavation',
    parentHub: 'excavation',
    hubSlug: 'excavation',
    displayName: 'Emergency Excavation',
    shortName: 'Emergency Excavation',
    hubLabel: 'Excavation',
    schemaType: 'LocalBusiness',
    urlPrefix: 'excavation/emergency-excavation',
    isTopLevel: false,
    tagline: '24/7 emergency excavation',
    pitch: 'Emergency excavation in {{CITY_NAME}}, KS. Collapsed lines, burst water mains, failed septic â€” 24/7 local response from El Dorado.',
    serviceBody: 'When a sewer line collapses or a water main bursts in {{CITY_NAME}}, you need a contractor who can respond immediately with both excavation equipment and a plumbing license. Sunflower Plumbing is based in El Dorado â€” not dispatching from Wichita â€” so response times throughout {{COUNTY_NAME}} are faster than most alternatives.\n\nEmergency excavation situations share one characteristic: waiting makes them worse. A collapsed sewer line backs up into the home. A burst water main floods the yard and cuts water service. A failed septic system surfaces and creates a health code violation. These are not situations where you schedule for next week â€” they require same-day, often same-hour response.\n\nWe keep equipment available for emergency dispatch and respond 24/7 including weekends and holidays. On arrival, we assess the situation quickly â€” locate the failure, determine the scope of repair, and get to work. We hold a Kansas plumbing license, so we can make the pipe connections the same day the ground is opened. No waiting on a separate plumber after the excavation crew leaves.\n\nFor water main emergencies, we coordinate with your utility provider on shutoff and restore service as quickly as possible. For sewer emergencies, we get the backup resolved and restore normal drain function before closing the site.',
    differentiator: 'Locally based crew with equipment. We are not routing from Wichita â€” faster response throughout {{COUNTY_NAME}}.',
    urgencyNote: 'Collapsed sewer lines, burst water mains, and surfacing septic systems are health and safety emergencies. Call us immediately at (316) 333-6326.',
    cta: 'Call now â€” 24/7 emergency response',
    faqs: [
      {
        q: 'What counts as an excavation emergency?',
        a: 'Collapsed sewer lines causing backup into the home, burst water mains cutting service or flooding the property, surfacing septic systems creating health code violations, and any situation where a failed buried utility is causing active damage or health risk. Call us â€” we respond 24/7.',
      },
      {
        q: 'How fast can you respond to an emergency in {{CITY_NAME}}?',
        a: 'We are based in El Dorado and serve {{COUNTY_NAME}} directly â€” not routing from Wichita. Response times vary by current workload, but our local base means we are typically on-site faster than competitors who dispatch from the Wichita metro.',
      },
      {
        q: 'Do you respond to emergencies on weekends and holidays?',
        a: 'Yes â€” 24/7, 365 days a year. Plumbing and excavation emergencies do not respect business hours. Call (316) 333-6326 any time.',
      },
      {
        q: 'Can you fix the pipe the same day you excavate?',
        a: 'Yes. We hold a Kansas plumbing license, so we can make the pipe connections the same day the ground is opened. You do not wait for a second contractor after the excavation is done â€” we handle both.',
      },
      {
        q: 'What should I do while waiting for emergency excavation in {{CITY_NAME}}?',
        a: 'For a burst water main, locate and shut off the main water shutoff to the home if possible. For a sewer backup, stop using any drains, toilets, or water-consuming appliances. For a surfacing septic system, keep people and pets away from the affected area. Call us at (316) 333-6326 and we will talk you through it.',
      },
    ],
  },
];

