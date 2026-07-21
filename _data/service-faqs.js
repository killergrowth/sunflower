// service-faqs.js -- FAQ + whatWeHandle data for all 19 services
module.exports = {
  plumbing: {
    faqs: [
      { q: "Do you offer same-day plumbing service in Butler County?", a: "Yes. For most plumbing repairs in El Dorado and surrounding Butler County communities, we offer same-day response. Call (316) 333-6326 and we'll confirm availability for your area." },
      { q: "Are you licensed and insured to work in Kansas?", a: "Yes. Sunflower Plumbing holds a Kansas plumbing license and carries full liability insurance on every job. You can ask to see documentation before work begins." },
      { q: "Do you work on both residential and commercial plumbing?", a: "Yes. We handle residential homes, rental properties, and light commercial buildings throughout Butler County. The scope, licensing, and insurance cover both." },
      { q: "What areas do you serve for plumbing?", a: "We serve El Dorado and communities throughout Butler County including Augusta, Andover, Rose Hill, Benton, Towanda, Whitewater, and surrounding areas. Call to confirm service to your specific location." },
      { q: "Do you provide upfront pricing before starting work?", a: "Yes. We quote before we start � no surprise charges on the invoice. If we find something unexpected once work is open, we stop and discuss it with you before proceeding." },
      { q: "Can you handle emergency plumbing calls at night or on weekends?", a: "Yes. We offer 24/7 emergency plumbing response. Emergency calls are prioritized � call (316) 333-6326 any time." }
    ],
    whatWeHandle: [
      { icon: "fa-faucet", title: "Leak Repair", desc: "Supply line leaks, fixture leaks, pipe joint failures. Located and repaired correctly." },
      { icon: "fa-water", title: "Water Heater", desc: "Repair, replacement, and new installation. Tank and tankless units." },
      { icon: "fa-toilet", title: "Drain & Sewer", desc: "Drain cleaning, sewer camera inspection, main line clogs." },
      { icon: "fa-wrench", title: "Fixture Service", desc: "Toilets, faucets, sinks, showers � repair and replacement." },
      { icon: "fa-fire", title: "Gas Lines", desc: "Licensed gas piping work. Appliance connections, new lines, leak checks." },
      { icon: "fa-home", title: "Remodel Plumbing", desc: "Kitchen and bathroom rough-in and finish plumbing for renovations." }
    ]
  },
  "water-heater-repair": {
    faqs: [
      { q: "How do I know if my water heater needs repair or full replacement?", a: "If your unit is under 10 years old and the issue is a failed element, thermostat, or pressure relief valve, repair usually makes sense. Units over 12-15 years old with multiple issues are typically better replaced. We'll give you an honest assessment when we arrive � not just the option that generates a bigger ticket." },
      { q: "Do you work on tankless water heaters?", a: "Yes. We service and install both traditional tank water heaters and tankless (on-demand) units. Tankless units require specific venting and gas line sizing � we handle that as part of the installation scope." },
      { q: "Can you replace my water heater same-day?", a: "In most cases, yes. We carry common tank sizes on the truck and can handle most standard residential replacements in a single visit. Tankless installations or unusual configurations may require a scheduled return once parts are sourced." },
      { q: "What are the signs my water heater is failing?", a: "Discolored or rusty water, rumbling or popping sounds during heating cycles, water pooling at the base of the tank, or inconsistent water temperature are all warning signs. Address them early � a failing water heater rarely gets better on its own." },
      { q: "What brands do you install?", a: "We install major brands including Rheem, Bradford White, and A.O. Smith. We'll recommend the right unit for your household size and usage patterns � not just what we have in stock." },
      { q: "Is hard water a problem for water heaters in Kansas?", a: "Yes. Butler County has hard water, and mineral scale buildup inside the tank accelerates wear. A water softener significantly extends water heater life. We can discuss both the replacement and a softener installation at the same visit." }
    ],
    whatWeHandle: [
      { icon: "fa-fire", title: "Element Replacement", desc: "Failed heating elements replaced same-day on most standard tank units." },
      { icon: "fa-thermometer-half", title: "Thermostat Repair", desc: "Upper and lower thermostat diagnosis and replacement." },
      { icon: "fa-shield-alt", title: "Pressure Relief Valve", desc: "T&P valve testing and replacement � a safety-critical component." },
      { icon: "fa-exchange-alt", title: "Full Unit Replacement", desc: "Tank and tankless water heater replacement and installation." },
      { icon: "fa-tint", title: "Anode Rod Service", desc: "Anode rod inspection and replacement to extend tank life." },
      { icon: "fa-water", title: "Expansion Tank", desc: "Thermal expansion tank installation for closed plumbing systems." }
    ]
  },
  "drain-cleaning": {
    faqs: [
      { q: "What's the difference between a drain snake and hydro-jetting?", a: "A drain snake (auger) physically breaks up or pulls out a clog. Hydro-jetting uses high-pressure water to scour the interior of the pipe � more thorough for grease buildup and recurring clogs. We use the right tool based on what we find." },
      { q: "Why does my drain keep clogging after I've already had it cleaned?", a: "Recurring clogs often indicate a deeper issue � root intrusion, partial pipe collapse, or a belly (low spot) in the line where debris accumulates. A camera inspection tells us what's actually causing it so we can fix the problem, not just the symptom." },
      { q: "Can you clean a main sewer line?", a: "Yes. Main sewer line cleaning is one of our most common calls. We snake or hydro-jet the main line and recommend a camera inspection if the clog was severe or if multiple fixtures were backing up simultaneously." },
      { q: "How do I prevent drains from clogging?", a: "Avoid putting grease, fibrous materials, or 'flushable' wipes down drains � they don't break down the way the packaging implies. Hair catchers in shower drains help significantly. For kitchen drains, run hot water after every use." },
      { q: "Multiple drains are slow at the same time � what does that mean?", a: "When multiple fixtures back up simultaneously, it almost always means the main sewer line is blocked or failing � not individual drain issues. This needs same-day attention. Call us immediately." },
      { q: "Do you offer camera inspection with drain cleaning?", a: "Yes. If a clog is severe, recurring, or if we have reason to suspect a structural issue in the line, we recommend a camera inspection. It's the only way to know for certain what's happening inside the pipe." }
    ],
    whatWeHandle: [
      { icon: "fa-sink", title: "Kitchen Drains", desc: "Grease buildup, food debris, and garbage disposal clogs." },
      { icon: "fa-bath", title: "Bathroom Drains", desc: "Hair, soap scum, and slow shower and tub drains." },
      { icon: "fa-water", title: "Main Sewer Line", desc: "Main line clogs cleared with snake or hydro-jet equipment." },
      { icon: "fa-camera", title: "Camera Inspection", desc: "Video inspection to diagnose recurring or severe drain issues." },
      { icon: "fa-tint-slash", title: "Floor Drains", desc: "Basement and utility floor drain cleaning and restoration." },
      { icon: "fa-recycle", title: "Hydro-Jetting", desc: "High-pressure pipe scour for grease-heavy lines and commercial drains." }
    ]
  },
  "leak-detection": {
    faqs: [
      { q: "How do you find a leak without tearing up the walls?", a: "We use professional leak detection equipment � acoustic sensors, pressure testing, and thermal imaging where applicable � to locate the leak before opening anything. We identify the exact location first, then make the smallest access cut necessary to repair it." },
      { q: "My water bill spiked but I don't see any wet spots. Could I have a hidden leak?", a: "Yes. Slab leaks, leaks inside wall cavities, and slow supply line failures often don't produce visible wet spots until significant damage has already occurred. A spike in your water bill with no change in usage is a strong indicator of a hidden leak." },
      { q: "What is a slab leak and how serious is it?", a: "A slab leak is a water line failure beneath the concrete foundation of your home. It can erode soil under the slab, damage flooring, and raise water bills significantly. It requires professional detection and repair � not a DIY fix." },
      { q: "How long does leak detection take?", a: "Most residential leak detections are completed in 1-3 hours depending on the complexity. We locate the source before making any access cuts, which keeps the repair scope as small as possible." },
      { q: "Can a small leak wait, or does it need to be fixed immediately?", a: "Small leaks rarely stay small. Water finds paths through insulation, framing, and drywall and creates mold conditions within 24-48 hours of wetting. We recommend addressing any confirmed leak immediately." },
      { q: "Do you repair the leak after you find it?", a: "Yes. We both locate and repair leaks � you don't need to hire a separate contractor. Once we've confirmed the location, we discuss the repair scope and cost with you before opening anything." }
    ],
    whatWeHandle: [
      { icon: "fa-search", title: "Hidden Leak Detection", desc: "Acoustic and pressure testing to find leaks inside walls and floors." },
      { icon: "fa-layer-group", title: "Slab Leak Repair", desc: "Under-slab supply line detection and repair without unnecessary demolition." },
      { icon: "fa-tint", title: "Supply Line Repair", desc: "Copper, CPVC, and PEX supply line repairs throughout the home." },
      { icon: "fa-tools", title: "Pipe Joint Repair", desc: "Pinhole leaks, joint failures, and corrosion-related pipe repairs." },
      { icon: "fa-chart-line", title: "Pressure Testing", desc: "System pressure testing to confirm leak location and extent." },
      { icon: "fa-home", title: "Post-Repair Verification", desc: "Pressure test after repair to confirm the fix before closing the access." }
    ]
  },
  "toilet-faucet-repair": {
    faqs: [
      { q: "My toilet runs constantly. Is that a big deal?", a: "Yes � a constantly running toilet can waste 200 gallons of water per day. Most running toilets are caused by a worn flapper, failed fill valve, or a misadjusted float arm. These are inexpensive parts and usually fixed in a single visit." },
      { q: "My faucet has been dripping for months. Is it worth repairing or should I replace it?", a: "A dripping faucet on a quality fixture is almost always worth repairing � usually a cartridge or O-ring replacement. If the fixture is old and parts are discontinued, or if it's a cheap builder-grade unit, replacement may make more sense. We'll give you an honest read when we look at it." },
      { q: "Can you repair a toilet that doesn't flush properly?", a: "Yes. Weak flushes are usually caused by a worn flapper, clogged rim jets, or a partially closed supply valve. We diagnose the actual cause rather than just swapping parts." },
      { q: "Do you handle toilet replacements?", a: "Yes. If your toilet is cracked, beyond repair, or you want to upgrade, we handle full toilet replacement including supply line and wax ring. We can install customer-supplied toilets or source one for you." },
      { q: "My faucet is leaking under the sink, not from the spout. What's causing it?", a: "Under-sink leaks usually come from the supply line connection, the shut-off valve, or the drain assembly � not the faucet body itself. We diagnose and repair the actual source, not just the most visible part." },
      { q: "How quickly can you get out for a toilet or faucet repair?", a: "For most standard repairs in Butler County, we can typically schedule same-day or next-day service. Call (316) 333-6326 and we'll confirm availability." }
    ],
    whatWeHandle: [
      { icon: "fa-toilet", title: "Running Toilet Repair", desc: "Flapper, fill valve, and flush valve replacements to stop water waste." },
      { icon: "fa-faucet", title: "Faucet Cartridge Repair", desc: "Dripping faucet repair for kitchen, bathroom, and utility fixtures." },
      { icon: "fa-exchange-alt", title: "Toilet Replacement", desc: "Full toilet removal and installation including supply line and wax ring." },
      { icon: "fa-wrench", title: "Supply Valve Repair", desc: "Corroded or seized shut-off valve replacement at toilet and faucet supply." },
      { icon: "fa-shower", title: "Shower Valve Repair", desc: "Cartridge and pressure-balancing valve repair for showers and tubs." },
      { icon: "fa-tools", title: "Handle & Trim Repair", desc: "Handle replacement, trim kit installation, and aesthetic fixture repairs." }
    ]
  },
  "fixture-replacement": {
    faqs: [
      { q: "Can you install a fixture I already purchased?", a: "Yes. We offer install-only service for customer-supplied fixtures. Bring your own sink, toilet, faucet, or showerhead and we'll install it correctly � including confirming the supply valves are in good shape before the new fixture goes in." },
      { q: "What fixtures do you install?", a: "We install sinks, faucets, toilets, showerheads, tub/shower valves, garbage disposals, and utility fixtures for both residential and light commercial properties." },
      { q: "Do I need a permit for fixture replacement?", a: "Standard like-for-like fixture replacements (same location, same connections) typically don't require a permit in Kansas. If you're adding a new fixture in a new location or changing drain configurations, a permit is required. We'll let you know before we start." },
      { q: "How long does fixture installation take?", a: "A single fixture swap � toilet, faucet, or showerhead � is typically a 1-2 hour job. Multiple fixtures in the same visit takes longer. We'll give you a time estimate when we discuss the scope." },
      { q: "My supply valves are old and corroded. Can you replace those too?", a: "Yes. We almost always inspect supply valves when installing new fixtures. Corroded or non-functional shut-off valves get replaced at installation � it avoids a leak issue after the new fixture is in." },
      { q: "Can you supply the fixture and install it?", a: "Yes. We can source and install fixtures from our trade suppliers. Lead times vary by product. If you want a specific brand or model, buying retail and providing it is often faster." }
    ],
    whatWeHandle: [
      { icon: "fa-sink", title: "Sink Installation", desc: "Drop-in, undermount, and pedestal sinks � supply and drain connections." },
      { icon: "fa-toilet", title: "Toilet Replacement", desc: "Full toilet replacement including wax ring, bolts, and supply line." },
      { icon: "fa-shower", title: "Shower & Tub Fixtures", desc: "Showerhead, valve, and trim replacement for tub-shower combos." },
      { icon: "fa-faucet", title: "Faucet Installation", desc: "Kitchen and bathroom faucet installation, supply-and-install or install-only." },
      { icon: "fa-recycle", title: "Garbage Disposal", desc: "Garbage disposal replacement and new installation." },
      { icon: "fa-wrench", title: "Supply Valve Replacement", desc: "Corroded shut-off valve replacement at fixture supply." }
    ]
  },
  "gas-line-services": {
    faqs: [
      { q: "Do I smell gas � what should I do?", a: "Leave the building immediately. Do not flip light switches or use your phone inside. Call 911 from outside, then call Atmos Energy. Do not re-enter until the gas company clears the building. Call us after you're safe � we'll repair the line once it's been made safe by the utility." },
      { q: "Is a plumber licensed to do gas line work in Kansas?", a: "Yes. In Kansas, gas line work is within the scope of a licensed plumber. Sunflower Plumbing holds the required license to install, repair, and extend gas lines for residential and light commercial properties." },
      { q: "Can you run a new gas line for an outdoor grill or generator?", a: "Yes. We run new gas lines for BBQ grills, outdoor fire features, standby generators, and appliances. We size the line correctly for the BTU load and pressure test before turning gas back on." },
      { q: "Can you connect a new gas appliance?", a: "Yes. Stove, dryer, water heater, and furnace gas connections are within our scope. We confirm proper flex line sizing, connection type, and perform a leak check at the connection before the appliance is in service." },
      { q: "How do you test for a gas leak?", a: "We pressure test the gas system and use professional gas detection equipment to check connections and line runs. We don't rely on the soap bubble method alone for anything beyond a quick spot check." },
      { q: "My gas bill increased but I don't smell anything. Could I have a slow leak?", a: "Possibly. Small leaks can be odorless or below the threshold for detection by smell. An unexplained increase in gas usage is worth having inspected. We can pressure test the system to confirm whether there's a leak." }
    ],
    whatWeHandle: [
      { icon: "fa-fire", title: "Gas Line Repair", desc: "Leak repair on existing gas lines � residential and light commercial." },
      { icon: "fa-plus-circle", title: "New Gas Line Runs", desc: "New gas line installation for appliances, generators, and outdoor features." },
      { icon: "fa-plug", title: "Appliance Connections", desc: "Stove, dryer, water heater, and furnace gas connection and testing." },
      { icon: "fa-search", title: "Gas Leak Detection", desc: "Pressure testing and professional leak detection equipment." },
      { icon: "fa-tools", title: "Pressure Testing", desc: "Post-repair system pressure test to confirm integrity before gas-up." },
      { icon: "fa-home", title: "Outdoor Gas Lines", desc: "Gas line runs to BBQ grills, fire pits, and outdoor kitchens." }
    ]
  },
  "kitchen-bathroom-plumbing": {
    faqs: [
      { q: "Do you do rough-in plumbing for kitchen or bathroom remodels?", a: "Yes. We handle both rough-in and finish plumbing for kitchen and bathroom remodels � supply lines, drain runs, vent connections, and fixture hookups. We coordinate with your general contractor or work directly with homeowners on self-managed projects." },
      { q: "Can you move a drain or supply line during a remodel?", a: "Yes. Relocating drains, supply lines, and vent stacks is a standard part of bathroom and kitchen remodel plumbing. We assess the existing conditions first and let you know if there are any structural or venting constraints." },
      { q: "When in the remodel timeline should I schedule the plumber?", a: "Rough-in happens after framing but before drywall and tile. Book early � kitchen and bathroom rough-in slots are often in demand. Missing the rough-in window forces expensive drywall rework. We'll coordinate with your project timeline." },
      { q: "Can you install an island sink with a new drain location?", a: "Yes. Island sink drain runs require proper venting (often an air admittance valve in Kansas) and correct slope back to the drain stack. We design the drain run correctly so it doesn't create odor or drainage issues later." },
      { q: "What permits are required for bathroom or kitchen plumbing work?", a: "Permit requirements vary by the scope of work. Like-for-like replacements usually don't require permits. Remodels that change drain or vent configurations, add fixtures, or alter water supply routes typically do require a permit. We handle permit coordination when required." },
      { q: "Can you handle both the plumbing and the tile work?", a: "We handle plumbing only. For tile, flooring, and cabinetry, you'll need separate contractors. We can coordinate our schedule with your other trades to minimize downtime." }
    ],
    whatWeHandle: [
      { icon: "fa-drafting-compass", title: "Rough-In Plumbing", desc: "Supply, drain, and vent rough-in before drywall and tile." },
      { icon: "fa-sink", title: "Finish Plumbing", desc: "Fixture hookups and final connections at project completion." },
      { icon: "fa-exchange-alt", title: "Drain Relocation", desc: "Moving drain and supply lines to match new fixture layouts." },
      { icon: "fa-shower", title: "Shower & Tub Plumbing", desc: "Rough-in and valve installation for walk-in showers and soaking tubs." },
      { icon: "fa-tools", title: "Dishwasher & Disposal", desc: "Supply and drain connections for dishwashers and garbage disposals." },
      { icon: "fa-file-alt", title: "Permit Coordination", desc: "We pull permits when required and coordinate inspections." }
    ]
  },
  "water-softener-installation": {
    faqs: [
      { q: "Does Butler County have hard water?", a: "Yes. Most of Butler County draws from sources with elevated mineral content � primarily calcium and magnesium. Hard water leaves scale deposits inside pipes and water heaters, shortens appliance life, and causes spotting on fixtures and glassware." },
      { q: "What size water softener do I need?", a: "Softener sizing is based on your household size, water usage, and the hardness level of your specific water supply. A properly sized unit regenerates efficiently without wasting salt or water. We assess these factors before recommending a system." },
      { q: "Where is the water softener installed?", a: "Most residential water softeners are installed at the main water supply line entry point � typically in a utility room, basement, or garage. We configure the bypass valve so you can take the softener offline without losing water service to the home." },
      { q: "Does a water softener affect water pressure?", a: "A properly installed softener has minimal impact on pressure. We size the unit for your supply line and confirm pressure is normal before we leave." },
      { q: "Will a water softener help my water heater last longer?", a: "Yes, significantly. Scale buildup from hard water is one of the primary causes of premature water heater failure in Kansas. Softened water dramatically reduces scale accumulation inside the tank and on heating elements." },
      { q: "Do you install whole-house filtration systems too?", a: "Yes. For properties with specific water quality concerns � iron, sulfur, sediment � we install whole-house filtration systems in addition to or in combination with water softeners. We can discuss your water quality situation and recommend the right configuration." }
    ],
    whatWeHandle: [
      { icon: "fa-tint", title: "Water Softener Installation", desc: "Properly sized softener with bypass valve and drain line configuration." },
      { icon: "fa-filter", title: "Whole-House Filtration", desc: "Iron, sediment, and carbon filtration for specific water quality issues." },
      { icon: "fa-exchange-alt", title: "Softener Replacement", desc: "Remove old unit and install new � bypass valve and brine drain handled." },
      { icon: "fa-tools", title: "Bypass Valve Setup", desc: "Correct bypass configuration so softener can be serviced without water shutoff." },
      { icon: "fa-water", title: "Water Testing Guidance", desc: "Hardness and basic water quality assessment to size the system correctly." },
      { icon: "fa-home", title: "Supply Line Tie-In", desc: "Main supply line connection with properly soldered or press-fit fittings." }
    ]
  },
  "sewer-line-repair": {
    faqs: [
      { q: "How do I know if my sewer line needs repair or full replacement?", a: "A camera inspection tells us definitively. Root intrusion and isolated joint failures are usually repairable. Collapsed pipe, severe offsetting, or a line that's failed in multiple places typically requires replacement. We show you the camera footage so you can see exactly what we found." },
      { q: "Do you do trenchless sewer repair?", a: "We assess each line individually. Some sewer repairs are best handled with targeted excavation and direct replacement. We'll recommend the approach that makes the most sense for your specific situation � not the most expensive option by default." },
      { q: "How long does sewer line repair take?", a: "A targeted repair on a localized failure can often be completed same-day. Full sewer line replacement is typically a 1-2 day job depending on the length of the line and excavation conditions. We'll give you a timeline estimate after camera inspection." },
      { q: "What causes sewer lines to fail?", a: "Root intrusion from trees and shrubs is the most common cause in older neighborhoods. Pipe material also matters � clay tile lines (common in homes built before 1980) are particularly susceptible to root intrusion and joint separation. Ground movement and soil conditions can also cause pipe offsetting over time." },
      { q: "Sewage is backing up into my basement. What do I do?", a: "Stop using all water immediately and call us. Do not try to flush or run water down any drain � it will make the backup worse. Sewage backup is a health hazard. We treat this as an emergency and respond as quickly as possible." },
      { q: "Do you handle the excavation too, or do I need a separate contractor?", a: "We handle both � Sunflower Plumbing operates excavation equipment in-house. You don't need to coordinate a separate excavation contractor. One call covers the camera inspection, excavation, repair or replacement, and backfill." }
    ],
    whatWeHandle: [
      { icon: "fa-camera", title: "Camera Inspection", desc: "Video inspection to locate the exact failure point before excavation." },
      { icon: "fa-tools", title: "Targeted Sewer Repair", desc: "Localized repair at the failure point without full-line replacement." },
      { icon: "fa-exchange-alt", title: "Full Sewer Replacement", desc: "Complete sewer line replacement from cleanout to city main or septic." },
      { icon: "fa-leaf", title: "Root Intrusion Clearing", desc: "Root cutting and removal combined with structural repair when needed." },
      { icon: "fa-hard-hat", title: "In-House Excavation", desc: "We operate the equipment � no separate excavation contractor required." },
      { icon: "fa-layer-group", title: "Backfill & Compaction", desc: "Properly compacted backfill to prevent settling after repair." }
    ]
  },
  septic: {
    faqs: [
      { q: "How often should a septic tank be pumped?", a: "Most residential septic tanks should be pumped every 3-5 years depending on household size and usage. We can assess your system during an inspection and give you a pumping recommendation based on the actual solids level in the tank." },
      { q: "What are the warning signs of a failing septic system?", a: "Slow drains throughout the house (not just one fixture), sewage odors inside or near the tank and field, wet or spongy ground over the lateral field, and sewage surfacing near the field area are all serious warning signs. Call us immediately if you see any of these." },
      { q: "Do you pump septic tanks?", a: "We coordinate with pumping services � septic pumping requires a licensed septic pumper. We handle the inspection, repair, and system work. For pumping, we can refer you to a licensed septic pumper in Butler County." },
      { q: "Do I need a permit for septic system repairs?", a: "Most significant septic system repairs � tank replacement, lateral field work, distribution box replacement � require a permit from Butler County and KDHE. We handle permit coordination as part of the project scope." },
      { q: "Can a septic system be repaired, or does it always need full replacement?", a: "It depends on what failed. Distribution box issues, inlet/outlet baffle failures, and isolated line problems are often repairable. A fully failed lateral field or a cracked tank that can't be repaired typically requires replacement. Camera inspection and system assessment tells us exactly what we're dealing with." },
      { q: "How long does a septic system last?", a: "A properly maintained concrete septic tank can last 30-40 years. Plastic tanks have similar lifespans if installed correctly. Lateral fields depend heavily on soil conditions and usage � a properly sized system in good soil can last 25-30 years or more." }
    ],
    whatWeHandle: [
      { icon: "fa-search", title: "Septic Inspection", desc: "System assessment covering tank, baffles, distribution box, and field." },
      { icon: "fa-tools", title: "Baffle & Lid Repair", desc: "Inlet and outlet baffle replacement, riser installation, and lid repair." },
      { icon: "fa-layer-group", title: "Distribution Box Repair", desc: "D-box inspection, cleaning, and replacement." },
      { icon: "fa-exchange-alt", title: "Tank Replacement", desc: "Old tank excavation and replacement with new concrete or poly tank." },
      { icon: "fa-hard-hat", title: "Lateral Field Work", desc: "Field assessment, repair, and full lateral field replacement." },
      { icon: "fa-file-alt", title: "Permit Coordination", desc: "KDHE and county permit coordination for septic system work." }
    ]
  },
  "lateral-field-installation": {
    faqs: [
      { q: "How do I know if my lateral field needs replacement?", a: "The clearest signs are wet or spongy ground over the field area, sewage odors near the field, and slow drains throughout the house. A failed lateral field won't recover on its own � the soil absorption capacity is permanently compromised. We assess the field and confirm the diagnosis before recommending replacement." },
      { q: "What permits are required for lateral field replacement?", a: "Lateral field replacement requires a permit from KDHE (Kansas Department of Health and Environment) and Butler County. We handle permit coordination, site evaluation, soil assessment, and the full installation through final inspection." },
      { q: "How long does lateral field installation take?", a: "Most lateral field installations are completed in 1-3 days once permits are in hand. Permit processing timelines vary � plan for 2-4 weeks from application to approval. We'll give you a specific timeline estimate during the assessment." },
      { q: "What determines where the new lateral field is placed?", a: "KDHE requires a soil evaluation (perc test) to confirm the soil's absorption capacity and determine the system size. The field location must meet setback requirements from property lines, wells, and structures. We coordinate the soil evaluation and design the system to meet all applicable codes." },
      { q: "Can a lateral field be installed in clay soil?", a: "Yes, but clay soils affect system sizing and design. Butler County's clay-dominant soils require larger field areas to achieve the same absorption capacity as sandy soils. We design systems to KDHE specifications for the actual soil conditions on your property." },
      { q: "Does the existing tank need to be replaced too?", a: "Not always. If the tank is in good structural condition and properly sized for the new field, it can often be reused. We inspect the tank as part of the pre-installation assessment and give you an honest recommendation." }
    ],
    whatWeHandle: [
      { icon: "fa-file-alt", title: "KDHE Permit Coordination", desc: "Full permit application, soil evaluation, and system design to code." },
      { icon: "fa-search", title: "Soil Assessment", desc: "Perc test coordination and soil evaluation for field sizing." },
      { icon: "fa-hard-hat", title: "Excavation & Installation", desc: "Trench excavation, gravel bed, pipe installation, and geotextile fabric." },
      { icon: "fa-layer-group", title: "Distribution Box Install", desc: "New distribution box installation with proper level and inspection." },
      { icon: "fa-tools", title: "Tank-to-Field Connection", desc: "Outlet baffle and connection piping between tank and new field." },
      { icon: "fa-clipboard-check", title: "Final Inspection", desc: "KDHE and county inspection coordination through project completion." }
    ]
  },
  excavation: {
    faqs: [
      { q: "Do you have to call 811 before excavating?", a: "Yes. Kansas law requires 811 notification before any excavation. We submit the notification and wait for utility marking before any digging begins. Even after marking, we proceed carefully in areas with older infrastructure where as-built records may not be accurate." },
      { q: "What kind of excavation work do you handle?", a: "We handle utility trenching (sewer, water, gas), septic system excavation, lateral field installation, site preparation, foundation backfill, and emergency excavation for failed lines. As a licensed plumber, we can handle the dig and the pipe connections in a single scope." },
      { q: "How do Butler County soil conditions affect excavation work?", a: "Butler County has heavy clay soils that behave differently than sandy or loamy soil. Clay stays wet longer, compacts poorly when disturbed and wet, and requires proper backfill technique to prevent long-term settling. We adjust our approach to local conditions on every job." },
      { q: "Can you do excavation work in rural areas outside of El Dorado?", a: "Yes. We serve Butler County broadly including rural properties and unincorporated areas. Many of our excavation jobs involve properties on acreage where the nearest excavation contractor is dispatching from Wichita. We're local � faster response times throughout the county." },
      { q: "Do you handle both the excavation and the plumbing on sewer and water line jobs?", a: "Yes. That's one of our core advantages. We hold a Kansas plumbing license and operate excavation equipment. On sewer, water, and septic jobs that require both trades, you deal with one contractor, one scope, and one point of accountability." },
      { q: "Do you offer 24/7 emergency excavation?", a: "Yes. Collapsed sewer lines, burst water mains, and septic emergencies often require same-day excavation. Call (316) 333-6326 any time for emergency response." }
    ],
    whatWeHandle: [
      { icon: "fa-water", title: "Utility Trenching", desc: "Sewer, water, and gas line trenching with proper depth and backfill." },
      { icon: "fa-hard-hat", title: "Septic Excavation", desc: "Tank, field, and distribution box excavation for new and replacement systems." },
      { icon: "fa-layer-group", title: "Site Preparation", desc: "Land clearing, rough grading, and building pad excavation." },
      { icon: "fa-home", title: "Foundation Backfill", desc: "Properly compacted backfill to prevent settling against foundation walls." },
      { icon: "fa-exclamation-triangle", title: "Emergency Excavation", desc: "24/7 emergency response for collapsed lines and failed septic systems." },
      { icon: "fa-phone", title: "811 Coordination", desc: "We handle the 811 notification and wait for utility marking before digging." }
    ]
  },
  "sewer-water-line-excavation": {
    faqs: [
      { q: "Do I need a separate plumber and excavator for a sewer line replacement?", a: "Not with us. Sunflower Plumbing holds a Kansas plumbing license and operates our own excavation equipment. We handle the dig, the pipe repair or replacement, and the backfill � one contractor, one scope." },
      { q: "How deep are residential sewer lines typically buried in Kansas?", a: "Most residential sewer lines in Kansas are buried 3-6 feet deep, depending on when the home was built and local frost line requirements. We confirm the depth with camera inspection before excavation to plan the scope accurately." },
      { q: "How long does sewer line excavation and replacement take?", a: "Most residential sewer line replacements are completed in 1-2 days. A longer line or complex access conditions can extend that timeline. We give you a specific estimate after camera inspection." },
      { q: "Do you restore the yard after excavation?", a: "We backfill and compact the trench. Final surface restoration (sod, landscaping) is typically the homeowner's responsibility, though we try to minimize surface disruption and preserve existing vegetation around the work area." },
      { q: "Can you replace a water main line to the house?", a: "Yes. Water main replacement from the meter to the home is within our scope. We coordinate with the water utility for meter shutoff and handle the trench, line installation, and backfill." },
      { q: "What pipe material do you use for sewer line replacement?", a: "We use SDR-35 PVC for most residential sewer line replacements � it's the current standard, chemical-resistant, and root-resistant compared to the clay tile it replaces in older homes." }
    ],
    whatWeHandle: [
      { icon: "fa-camera", title: "Pre-Excavation Camera", desc: "Video inspection to confirm depth, location, and failure point before digging." },
      { icon: "fa-hard-hat", title: "Sewer Line Excavation", desc: "Trench, remove failed pipe, and install new PVC sewer line." },
      { icon: "fa-tint", title: "Water Main Excavation", desc: "Water main replacement from meter to home � full trench scope." },
      { icon: "fa-tools", title: "Connection Work", desc: "City tap and home connection fitting � licensed plumber on every connection." },
      { icon: "fa-layer-group", title: "Backfill & Compaction", desc: "Compacted lifts to prevent trench settling over buried lines." },
      { icon: "fa-phone", title: "Utility Coordination", desc: "811 notification and water utility coordination for meter shutoff." }
    ]
  },
  "septic-system-excavation": {
    faqs: [
      { q: "What's involved in a full septic system excavation?", a: "A full septic system excavation covers tank excavation and bed, distribution box installation, lateral field trenching, and all plumbing connections. We also handle the KDHE permit, soil evaluation, and coordination with the county inspector through final sign-off." },
      { q: "How long does septic system installation take?", a: "New septic system installation is typically a 2-3 day project once permits are in hand. Permit processing through KDHE and Butler County can take 2-6 weeks. We'll walk you through the full timeline during the estimate." },
      { q: "What soil conditions are required for a septic system?", a: "KDHE requires a site evaluation and perc test to confirm soil suitability. Soils that absorb too slowly (heavy clay) or too quickly (coarse gravel) require alternative system designs. We coordinate the soil evaluation and design the system around actual conditions." },
      { q: "Can you install a septic system on a property that currently uses a holding tank?", a: "Yes. Converting from a holding tank to a full septic system with a lateral field requires a KDHE permit and site evaluation. We handle the full conversion including the permit, design, excavation, installation, and inspection." },
      { q: "Do you work on aerobic treatment units (ATUs)?", a: "We assess septic needs on a project-by-project basis. If site conditions require an ATU rather than a conventional system, we'll discuss the options and make the appropriate referral if the scope is outside our license." },
      { q: "What maintenance does a new septic system require?", a: "New systems should be pumped within the first 3-5 years depending on household usage. Avoid flushing non-biodegradable materials, and don't plant trees or shrubs over the lateral field area. We review maintenance requirements with every new system installation." }
    ],
    whatWeHandle: [
      { icon: "fa-file-alt", title: "KDHE Permitting", desc: "Full permit application, site evaluation, and system design." },
      { icon: "fa-hard-hat", title: "Tank Excavation & Install", desc: "Tank pit excavation, tank bed and set, inlet/outlet connection." },
      { icon: "fa-layer-group", title: "Lateral Field Trenching", desc: "Field trench excavation, gravel bed, pipe, and geotextile cover." },
      { icon: "fa-tools", title: "Distribution Box", desc: "D-box excavation, level, and installation with inspection port." },
      { icon: "fa-home", title: "House-to-Tank Line", desc: "Sewer line from home foundation to tank inlet � properly sloped and bedded." },
      { icon: "fa-clipboard-check", title: "Inspection Coordination", desc: "KDHE and county final inspection scheduling and sign-off." }
    ]
  },
  trenching: {
    faqs: [
      { q: "What do you use for trenching � hand dig or machine?", a: "We use a trencher or mini-excavator depending on the width, depth, and access conditions. Hand digging is used for close-tolerance work near structures or existing utilities. We match the equipment to the job." },
      { q: "How do you handle utility lines near the trench?", a: "We submit an 811 notification before any dig and wait for utility marking. In Butler County's older areas, we proceed carefully even after marking � underground utility records are often incomplete for older infrastructure." },
      { q: "How deep can you trench?", a: "Depth depends on equipment configuration and soil conditions. Most residential utility trench work runs 3-6 feet. We'll confirm the required depth for your project during the estimate." },
      { q: "What does proper backfill mean, and why does it matter?", a: "Proper backfill means replacing the excavated material in layers (lifts) and compacting each lift before adding the next. Skipping compaction leaves a loose trench that settles over time, which can damage buried lines and create surface depressions. We backfill to spec, not just to fill the hole." },
      { q: "Can you trench for underground electrical or low-voltage lines?", a: "We handle trenching for utility runs. Electrical connections must be made by a licensed electrician � we provide the trench, they make the connections. We coordinate the handoff." },
      { q: "Can you trench on a property with trees and existing landscaping?", a: "Yes. We take a close-in approach near trees and landscaping to minimize root and surface damage. For sensitive areas, hand digging near the obstacle is sometimes the right call." }
    ],
    whatWeHandle: [
      { icon: "fa-water", title: "Utility Trenching", desc: "Sewer, water, and gas line trenching at required depth." },
      { icon: "fa-layer-group", title: "Septic Lateral Trenching", desc: "Precise lateral field trenching to KDHE-specified dimensions." },
      { icon: "fa-tint-slash", title: "French Drain Trenching", desc: "Drainage trench for French drain and perimeter drain systems." },
      { icon: "fa-home", title: "Outbuilding Utility Runs", desc: "Trenching for water, sewer, and conduit to outbuildings and shops." },
      { icon: "fa-tools", title: "Compacted Backfill", desc: "Lifts compacted to prevent settling over buried utility lines." },
      { icon: "fa-phone", title: "811 Notification", desc: "We submit the notification and wait for marking before digging." }
    ]
  },
  "site-preparation": {
    faqs: [
      { q: "What does site preparation include?", a: "Site prep covers land clearing, rough grading, building pad excavation, and utility rough-in. The goal is to deliver a ready site to your builder � proper grades, pad elevation, and utilities stubbed to the right locations." },
      { q: "Why does drainage grading matter so much in Kansas?", a: "Butler County's clay soils don't absorb water quickly. Improper grading that slopes toward a structure allows water to collect against the foundation, which creates hydrostatic pressure and accelerates foundation deterioration. We grade with drainage in mind, not just aesthetics." },
      { q: "Can you combine utility rough-in with site grading?", a: "Yes � and it's more efficient to do both in the same mobilization. We coordinate site grading and utility rough-in so your builder arrives to a ready site without needing to call a second contractor." },
      { q: "Do you need a permit for site preparation?", a: "For new construction, a grading or earthwork permit is often required by the county. Smaller land clearing projects on existing properties may not. We identify permit requirements during the estimate phase." },
      { q: "Can you clear trees and brush as part of site prep?", a: "We clear brush, stumps, and existing vegetation as part of site preparation. Large tree removal may require a separate tree service for above-ground work before we move equipment in." },
      { q: "How far in advance should I book site prep?", a: "Excavation equipment is in high demand during spring and summer building season. Book 4-6 weeks ahead when possible. We'll confirm availability and lock in your spot on the schedule." }
    ],
    whatWeHandle: [
      { icon: "fa-tree", title: "Land Clearing", desc: "Brush clearing, stump removal, and demolition of existing structures." },
      { icon: "fa-layer-group", title: "Rough Grading", desc: "Building pad grading with proper drainage slope away from structure." },
      { icon: "fa-hard-hat", title: "Pad Excavation", desc: "Building pad cut to elevation for slab, crawl space, or basement." },
      { icon: "fa-water", title: "Utility Rough-In", desc: "Water, sewer, and conduit rough-in coordinated with grading scope." },
      { icon: "fa-tint-slash", title: "Drainage Establishment", desc: "Swales and surface grading to establish positive drainage." },
      { icon: "fa-file-alt", title: "Permit Coordination", desc: "Grading permit identification and coordination when required." }
    ]
  },
  "backfill-grading": {
    faqs: [
      { q: "Why does foundation backfill settlement happen, and can it be prevented?", a: "Settlement happens when backfill is placed too quickly without compaction, or when wet clay is used for backfill and then dries and shrinks. We backfill in properly compacted lifts � each layer compacted before the next goes in � to eliminate long-term settling." },
      { q: "My yard has standing water near the foundation. Is that a grading problem?", a: "Usually yes. Standing water near a foundation almost always indicates negative grade � the yard slopes toward the structure rather than away. This is a fixable grading issue in most cases. We assess the existing grade and correct it." },
      { q: "Can you regrade around an existing house without damaging the landscaping?", a: "Yes, though some disruption is unavoidable when correcting significant grade issues. We work to preserve existing vegetation and hardscaping wherever possible and discuss the scope of disruption with you before we start." },
      { q: "What's the correct slope away from a foundation?", a: "The standard recommendation is a minimum 6-inch drop in the first 10 feet away from the foundation. This ensures surface water moves away from the structure consistently, even after soil settles slightly." },
      { q: "Do you handle grading after excavation work, or is that separate?", a: "We handle both in the same scope. After any excavation � sewer, water line, septic � we backfill properly and restore the grade. No need to bring in a separate grading contractor after excavation work." },
      { q: "Can you add topsoil to correct low spots in the yard?", a: "Yes. Lot leveling, low-spot filling, and topsoil addition for final grading are part of our site work scope. We'll discuss the scope and material quantities during the estimate." }
    ],
    whatWeHandle: [
      { icon: "fa-layer-group", title: "Foundation Backfill", desc: "Compacted lifts against foundation walls to prevent settling and hydrostatic pressure." },
      { icon: "fa-tint-slash", title: "Drainage Grading", desc: "Positive slope correction to direct surface water away from structures." },
      { icon: "fa-home", title: "Lot Leveling", desc: "Low-spot filling and final grading for drainage and aesthetics." },
      { icon: "fa-tools", title: "Post-Excavation Restore", desc: "Backfill and grade restoration after sewer, water, or septic work." },
      { icon: "fa-leaf", title: "Topsoil Addition", desc: "Topsoil material sourcing and spreading for final grade establishment." },
      { icon: "fa-hard-hat", title: "Compaction", desc: "Plate compaction and lift-by-lift backfill to engineered standards." }
    ]
  },
  "emergency-excavation": {
    faqs: [
      { q: "What qualifies as an excavation emergency?", a: "A collapsed sewer line, a burst water main, surfacing septic, or a line failure causing active flooding or health hazard qualifies as an emergency. We respond 24/7 for these situations � call (316) 333-6326 immediately." },
      { q: "How fast can you respond to an excavation emergency in Butler County?", a: "We're based in El Dorado � not dispatching from Wichita. For most Butler County locations, we can have equipment on-site within 1-3 hours of a confirmed emergency call, depending on time of day and current job load." },
      { q: "Do you still call 811 for emergency excavation?", a: "Yes. Even in an emergency, we submit a 911 emergency locate request through 811 and proceed carefully near known utility corridors. The 5-minute call is worth it � hitting a gas line on an emergency dig makes a bad situation much worse." },
      { q: "What should I do while waiting for you to arrive?", a: "Shut off water at the main if a water line is involved. Stop using all plumbing if a sewer line has failed. Stay away from the affected area � surfacing sewage is a health hazard. Don't attempt to dig yourself without utility clearance." },
      { q: "Can you handle the plumbing and the excavation as one scope on an emergency call?", a: "Yes. We carry both plumbing and excavation capabilities. We won't dig up a failed sewer line and then leave you waiting for a plumber to arrive and connect the repair." },
      { q: "How do you handle billing on emergency calls?", a: "Emergency calls are billed at our standard rates plus an after-hours service fee for nights, weekends, and holidays. We quote before we start and get your authorization � same process as a regular call, just faster." }
    ],
    whatWeHandle: [
      { icon: "fa-exclamation-triangle", title: "Collapsed Sewer Response", desc: "Emergency excavation and repair on failed or collapsed sewer lines." },
      { icon: "fa-tint", title: "Burst Water Main", desc: "Water main failure excavation, repair, and service restoration." },
      { icon: "fa-layer-group", title: "Septic Emergency", desc: "Failed septic excavation � surfacing sewage, backed-up systems." },
      { icon: "fa-hard-hat", title: "Equipment On-Site", desc: "We arrive with excavation equipment, not just a service van." },
      { icon: "fa-phone", title: "24/7 Response", desc: "Emergency line answered day and night � (316) 333-6326." },
      { icon: "fa-tools", title: "Plumbing + Excavation", desc: "One contractor handles the dig and the pipe repair � no split scope." }
    ]
  },
}; // end module.exports
