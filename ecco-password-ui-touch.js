function invalid_ecco1_password(instance, flags)
{
    let session = instance.ecco1_session;
    let version = session.mode;

    let stage_id = 0;
    let description = "";

    session.stage_name = "";
    session.stage_caption = "ecco1_caption_title_screen";
    session.stage_theme = THEME_DEFAULT;

    description = "(s)Invalid Password\nfor " + get_ecco1_stage_name(session.stage_index, version);
    description+= "\n\n";

    if (session.error_id == ECCO_INVALIDPASS_ALPHAONLY)
    {
        description+= "Passwords can only contain letters and spaces.\n\n";

        session.stage_description = description;
        return;
    }
    else if (session.error_id == ECCO_INVALIDPASS_CHECKSUM)
    {
        description+= "The password checksum is invalid. The password checksum is the eighth character in the password. ";
        description+= "Use the suggested password to correct this.\n\n"; 

        session.stage_description = description;
        return;
    }

    if (version == ECCO1_MEGADRIVE)
    {
        if ((session.stage_event == ECCO1_STORM_VORTEX) && (session.unlimited_air == 0))
        {
            description+= "Unlimited Air must be enabled when the stage event is set to The Storm sends Ecco to The Tube\n\n"; 
            session.stage_description = description;
        }

        return;
    }

    stage_id = get_ecco1_stage_id(session.stage_index, version, 1);

    if (stage_id & ECCO1_STAGE_EVENT_MASK)
    {
        if (stage_id & ECCO1_TMACHINE_JURASSIC)
        {
           if ((session.stage_id & ECCO1_TMACHINE_JURASSIC) == 0)
                description+= "Stage Event must be set to Time Machine sends Ecco to Jurassic Beach.\n";
        }
        else if (stage_id & ECCO1_TMACHINE_HOMEBAY)
        {
            if ((session.stage_id & ECCO1_TMACHINE_HOMEBAY) == 0)
                description+= "Stage Event must be set to Time Machine sends Ecco to Home Bay.\n";
        }
        else if (stage_id & ECCO1_STORM_VORTEX)
        {
            if ((session.stage_id & ECCO1_STORM_VORTEX) == 0)
                description+= "Stage Event must be set to Storm sends Ecco to The Tube.\n";
        }
    }

    if (stage_id & ECCO1_GLOBE_OBTAINED_DEFAULT_MASK)
    {
        if ((session.stage_id & ECCO1_GLOBE_OBTAINED_DEFAULT_MASK) == 0)
            description+= "Globe Obtained must be set to Red, Brown, Purple or Green only.\n";
    }
    else if ((stage_id & ECCO1_GLOBE_OBTAINED_DEFAULT_MASK) == 0)
    {
        if (session.stage_id & ECCO1_GLOBE_OBTAINED_MASK)
            description+= "Globe Obtained must be set to No Globe Obtained.\n";
    }

    if (stage_id & ECCO1_UNLIMITED_AIR)
    {
        if ((session.stage_id & ECCO1_UNLIMITED_AIR) == 0)
            description+= "Unlimited Air must be enabled.\n";
    }
    else if ((stage_id & ECCO1_UNLIMITED_AIR) == 0)
    {
        if (session.stage_id & ECCO1_UNLIMITED_AIR)
            description+= "Unlimited Air must be disabled.\n";
    }

    if (flags & ECCO1_CHARGE_SONAR)
    if ((stage_id & ECCO1_CHARGE_SONAR) == 0)
    {
        if (session.stage_id & ECCO1_CHARGE_SONAR)
            description+= "Charge Sonar must be disabled.\n";
    }

    if (flags & ECCO1_PERMA_KILL)
    if ((stage_id & ECCO1_PERMA_KILL) == 0)
    {
        if (session.stage_id & ECCO1_PERMA_KILL)
            description+= "Permanent Kill must be disabled.\n";
    }

    description+= "\n\n";
    session.stage_description = description;
}

// BEGIN ecco1md_stage*

function get_ecco1md_table_stage_menu()
{
    let table = [
        "menu_ecco1md_stage_01",
        "menu_ecco1md_stage_02",
        "menu_ecco1md_stage_03",
        "menu_ecco1md_stage_04",
        "menu_ecco1md_stage_05",
        "menu_ecco1md_stage_06",
        "menu_ecco1md_stage_07",
        "menu_ecco1md_stage_08",
        "menu_ecco1md_stage_09",
        "menu_ecco1md_stage_10",
        "menu_ecco1md_stage_11",
        "menu_ecco1md_stage_12",
        "menu_ecco1md_stage_13",
        "menu_ecco1md_stage_14",
        "menu_ecco1md_stage_15",
        "menu_ecco1md_stage_16",
        "menu_ecco1md_stage_17",
        "menu_ecco1md_stage_18",
        "menu_ecco1md_stage_19",
        "menu_ecco1md_stage_20",
        "menu_ecco1md_stage_21",
        "menu_ecco1md_stage_22",
        "menu_ecco1md_stage_23",
        "menu_ecco1md_stage_24",
        "menu_ecco1md_stage_25",
        "menu_ecco1md_stage_26"
    ];

    return table;
}

function get_ecco1md_table_stage_id(flags)
{
    let index = 0;
    let table = [
        -1,
        ECCO1_SELECTIONSCR,
        ECCO1_UNDERCAVES,
        ECCO1_THEVENTS,
        ECCO1_THELAGOON,
        ECCO1_RIDGEWATER,
        ECCO1_OPENOCEAN1,
        ECCO1_ICEZONE,
        ECCO1_HARDWATER,
        ECCO1_COLDWATER,
        ECCO1_ISLANDZONE,
        ECCO1_DEEPWATER1,
        ECCO1_THEMARBLESEA,
        ECCO1_THELIBRARY,
        ECCO1_DEEPCITY,
        ECCO1_CITYOFFOREVER1,
        ECCO1_JURASSICBEACH,
        ECCO1_PTERANODONPOND,
        ECCO1_ORIGINBEACH,
        ECCO1_TRILOBITECIRCLE,
        ECCO1_DARKWATER,
        ECCO1_DEEPWATER2,
        ECCO1_CITYOFFOREVER2,
        ECCO1_THETUBE,
        ECCO1_THEMACHINE,
        ECCO1_THELASTFIGHT
    ];

    if (flags == 0)
    {
        for (index = 0; index < table.length; index++)
            table[index]&= ECCO1_MASK_STAGEID;
    }

    return table;
}

function get_ecco1md_table_stage_name()
{
    let table = [
        -1,
	"Selection Screen",
	"Undercaves",
	"The Vents",
	"The Lagoon",
	"Ridge Water",
	"Open Ocean",
	"Ice Zone",
	"Hard Water",
	"Cold Water", 
	"Island Zone",
	"Deep Water",
	"The Marble Sea",
	"The Library",
	"Deep City",
	"City of Forever",
	"Jurassic Beach",
	"Pteranodon Pond",
	"Origin Beach",
	"Trilobite Circle",
	"Dark Water",
	"Deep Water",
	"City of Forever",
	"The Tube",
	"Welcome to the Machine",
	"The Last Fight"
    ];
	
    return table;
}

function get_ecco1md_table_stage_description()
{
    let table = [
        -1,
        -1,
        "(s)A deep maze of caverns with no surface to the dry side. Songs of the sea sing of a giant danger in this place.\n\n(l)",
        "(s)Giant cracks in the ocean floor have strong upward currents of warm water. After the storm, songs of three trapped dolphins are heard here...\n\n(l)",
        "(s)The songs of the sea sing of the stone eating stars that live in this place. A dolphin sings for her trapped pod.\n\n(l)",
        "(s)Two cold water ponds connected by a maze of shell and stone. To pass ridge water one must have great knowledge of the sea.\n\n(l)",
        "(s)\nThe open ocea is cold and dangerous.\n\n\n(l)",
        "(s)Dark cold waters with few places to breath. Strange cold water creatures live in this place. Distant songs are heard but not understood.\n\n(l)",
        "(s)Water turns to slippery stone from the dark cold. There is great danger when the water stones move. The distant songs continue...\n\n(l)",
        "(s)Quiet songs of wisdom sing about the hard water called ice. The big blue is near.\n\n(l)",
        "(s)\nSeven islands in warmer waters.\n\n\n(l))",
        "(s)Ancient breathless passages run so deep that no songs of this place have yet been sung.\n\n(l)",
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
     ];

    return table;
}

function get_ecco1md_table_stage_caption()
{
    let table = [
        -1,
        "ecco1_caption_selection_scr",
        "ecco1_caption_undercaves",
        "ecco1_caption_home_bay",
        "ecco1_caption_home_bay",
        "ecco1_caption_home_bay",
        "ecco1_caption_home_bay",
        "ecco1_caption_ice_zone",
        "ecco1_caption_ice_zone",
        "ecco1_caption_big_blue",
        "ecco1_caption_home_bay",
        "ecco1_caption_deep_water",
        "ecco1_caption_atlantis",
        "ecco1_caption_the_library",
        "ecco1_caption_atlantis",
        "ecco1_caption_city_of_forever",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_dark_water",
        "ecco1_caption_deep_water",
        "ecco1_caption_city_of_forever",
        "ecco1_caption_the_tube",
        "ecco1_caption_the_machine",
        "ecco1_caption_the_last_fight"
    ];

    return table;
}

function get_ecco1md_table_stage_theme()
{
    let table = [
        -1,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_THE_MACHINE,
        THEME_THE_MACHINE,
        THEME_THE_LAST_FIGHT
    ];

    return table;
}

// END ecco1md_stage_*
// BEGIN ecco1jpmd_stage_*

function get_ecco1jpmd_table_stage_menu()
{
    let table = [
        "menu_ecco1jpmd_stage_01",
        "menu_ecco1jpmd_stage_02",
        "menu_ecco1jpmd_stage_03",
        "menu_ecco1jpmd_stage_04",
        "menu_ecco1jpmd_stage_05",
        "menu_ecco1jpmd_stage_06",
        "menu_ecco1jpmd_stage_07",
        "menu_ecco1jpmd_stage_08",
        "menu_ecco1jpmd_stage_09",
        "menu_ecco1jpmd_stage_10",
        "menu_ecco1jpmd_stage_11",
        "menu_ecco1jpmd_stage_12",
        "menu_ecco1jpmd_stage_13",
        "menu_ecco1jpmd_stage_14",
        "menu_ecco1jpmd_stage_15",
        "menu_ecco1jpmd_stage_16",
        "menu_ecco1jpmd_stage_17",
        "menu_ecco1jpmd_stage_18",
        "menu_ecco1jpmd_stage_19",
        "menu_ecco1jpmd_stage_20",
        "menu_ecco1jpmd_stage_21",
        "menu_ecco1jpmd_stage_22",
        "menu_ecco1jpmd_stage_23",
        "menu_ecco1jpmd_stage_24",
        "menu_ecco1jpmd_stage_25",
        "menu_ecco1jpmd_stage_26",
        "menu_ecco1jpmd_stage_27",
        "menu_ecco1jpmd_stage_28"
    ];

    return table;
}

function get_ecco1jpmd_table_stage_id(flags)
{
    let table = [
        -1,
        ECCO1JPMD_SELECTIONSCR,
        ECCO1JPMD_UNDERCAVES,
        ECCO1JPMD_THEVENTS,
        ECCO1JPMD_THELAGOON,
        ECCO1JPMD_RIDGEWATER,
        ECCO1JPMD_OPENOCEAN1,
        ECCO1JPMD_ICEZONE,
        ECCO1JPMD_HARDWATER,
        ECCO1JPMD_COLDWATER,
        ECCO1JPMD_OPENOCEAN2,
        ECCO1JPMD_ISLANDZONE,
        ECCO1JPMD_DEEPWATER1,
        ECCO1JPMD_THEMARBLESEA,
        ECCO1JPMD_THELIBRARY,
        ECCO1JPMD_DEEPCITY,
        ECCO1JPMD_CITYOFFOREVER1,
        ECCO1JPMD_JURASSICBEACH,
        ECCO1JPMD_PTERANODONPOND,
        ECCO1JPMD_ORIGINBEACH,
        ECCO1JPMD_TRILOBITECIRCLE,
        ECCO1JPMD_DARKWATER,
        ECCO1JPMD_DEEPWATER2,
        ECCO1JPMD_CITYOFFOREVER2,
        ECCO1JPMD_THETUBE,
        ECCO1JPMD_THEMACHINE,
        ECCO1JPMD_THESTOMACH,
        ECCO1JPMD_THELASTFIGHT
    ];

    if (flags == 0)
    {
        for (index = 0; index < table.length; index++)
            table[index]&= ECCO1_MASK_STAGEID;
    }

    return table;
}

function get_ecco1jpmd_table_stage_name()
{
    let table = 
    [
        -1,
        "Selection Screen",
	"Undercaves",
	"The Vents",
	"The Lagoon",
	"Ridge Water",
	"Open Ocean",
	"Ice Zone",
	"Hard Water",
	"Cold Water", 
	"Open Ocean",
	"Island Zone",
	"Deep Water",
	"The Marble Sea",
	"The Library",
	"Deep City",
	"City of Forever",
	"Jurassic Beach",
	"Pteranodon Pond",
	"Origin Beach",
	"Trilobite Circle",
	"Dark Water",
	"Deep Water",
	"City of Forever",
	"The Tube",
	"Welcome to the Machine",
	"The Stomach",
	"The Last Fight"
    ];

    return table;
}

function get_ecco1jpmd_table_stage_description()
{ 
    let table = [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
     ];


    return table;
}

function get_ecco1jpmd_table_stage_caption()
{
    let table = [
        -1,
        "ecco1_caption_selection_scr",
        "ecco1_caption_undercaves",
        "ecco1_caption_home_bay",
        "ecco1_caption_home_bay",
        "ecco1_caption_home_bay",
        "ecco1_caption_home_bay",
        "ecco1_caption_ice_zone",
        "ecco1_caption_ice_zone",
        "ecco1_caption_big_blue",
        "ecco1_caption_home_bay",
        "ecco1_caption_home_bay",
        "ecco1_caption_deep_water",
        "ecco1_caption_atlantis",
        "ecco1_caption_the_library",
        "ecco1_caption_atlantis",
        "ecco1_caption_city_of_forever",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_dark_water",
        "ecco1_caption_deep_water",
        "ecco1_caption_city_of_forever",
        "ecco1_caption_the_tube",
        "ecco1_caption_the_machine",
        "ecco1_caption_the_stomach",
        "ecco1_caption_the_last_fight"
    ];

    return table;
}

function get_ecco1jpmd_table_stage_theme()
{
    let table = [
        -1,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_THE_MACHINE,
        THEME_THE_MACHINE,
        THEME_THE_MACHINE,
        THEME_THE_LAST_FIGHT
    ];

    return table;
}

function validate_ecco1jpmd_deepwater2(instance)
{
    let session = instance.ecco1_session;
    let version = session.mode;

    let stage_id = 0;
    let current_stage_id = 0;

    stage_id = ECCO1JPMD_DEEPWATER2 & (ECCO1_MASK_STAGEID | ECCO1_TMACHINE_HOMEBAY);
    current_stage_id = session.stage_id & (ECCO1_MASK_STAGEID | ECCO1_TMACHINE_HOMEBAY);

    if (current_stage_id != stage_id)
        return 1;

    stage_id = get_ecco1_stage_id(session.stage_index, version, 1);
    stage_id&= ~(ECCO1_CHARGE_SONAR | ECCO1_PERMA_KILL);
    stage_id|= ECCO1_GLOBE_OBTAINED_DEFAULT_MASK;        

    current_stage_id = session.stage_id & ~(ECCO1_CHARGE_SONAR | ECCO1_PERMA_KILL);
    if (current_stage_id & ECCO1_GLOBE_OBTAINED_DEFAULT_MASK)
        current_stage_id|= ECCO1_GLOBE_OBTAINED_DEFAULT_MASK;

    if (current_stage_id == stage_id)
        return 0;

    invalid_ecco1_password(instance);
    return -1;
}

function validate_ecco1jpmd_password(instance)
{
    let session = instance.ecco1_session;
    let version = session.mode;

    let current_stage_id = 0;
    let stage_id = 0;

    let result = 0;

    if (session.error_id < 0)
    {
        invalid_ecco1_password(instance, 0);
        return -1;
    }

    result = validate_ecco1jpmd_deepwater2(instance);
    if (result == 0 || result == -1) return result;

    current_stage_id = session.stage_id & ~(ECCO1_CHARGE_SONAR | ECCO1_PERMA_KILL);

    stage_id = get_ecco1_stage_id(session.stage_index, version, 1);
    stage_id&= ~(ECCO1_CHARGE_SONAR | ECCO1_PERMA_KILL);

    if (current_stage_id == stage_id)
        return 0;

    invalid_ecco1_password(instance, 0);
    return -1;
}

// END ecco1jpmd_stage_*
// BEGIN ecco1cd_stage_*

function get_ecco1cd_table_stage_menu()
{
    let table = [
        "menu_ecco1cd_stage_01",
        "menu_ecco1cd_stage_02",
        "menu_ecco1cd_stage_03",
        "menu_ecco1cd_stage_04",
        "menu_ecco1cd_stage_05",
        "menu_ecco1cd_stage_06",
        "menu_ecco1cd_stage_07",
        "menu_ecco1cd_stage_08",
        "menu_ecco1cd_stage_09",
        "menu_ecco1cd_stage_10",
        "menu_ecco1cd_stage_11",
        "menu_ecco1cd_stage_12",
        "menu_ecco1cd_stage_13",
        "menu_ecco1cd_stage_14",
        "menu_ecco1cd_stage_15",
        "menu_ecco1cd_stage_16",
        "menu_ecco1cd_stage_17",
        "menu_ecco1cd_stage_18",
        "menu_ecco1cd_stage_19",
        "menu_ecco1cd_stage_20",
        "menu_ecco1cd_stage_21",
        "menu_ecco1cd_stage_22",
        "menu_ecco1cd_stage_23",
        "menu_ecco1cd_stage_24",
        "menu_ecco1cd_stage_25",
        "menu_ecco1cd_stage_26",
        "menu_ecco1cd_stage_27",
        "menu_ecco1cd_stage_28",
        "menu_ecco1cd_stage_29",
        "menu_ecco1cd_stage_30"
    ];

    return table;
}

function get_ecco1cd_table_stage_id(flags)
{
    let table = [
        -1,
        ECCO1CD_UNDERCAVES,
        ECCO1CD_THEVENTS,
        ECCO1CD_THELAGOON,
        ECCO1CD_RIDGEWATER,
        ECCO1CD_OPENOCEAN1,
        ECCO1CD_ICEZONE,
        ECCO1CD_HARDWATER,
        ECCO1CD_COLDWATER,
        ECCO1CD_ISLANDZONE,
        ECCO1CD_DEEPWATER1,
        ECCO1CD_DEEPGATE,
        ECCO1CD_SHIPGRAVESEA,
        ECCO1CD_WRECKTRAP,
        ECCO1CD_SEAOFSILENCE,
        ECCO1CD_VOLCANICREEF,
        ECCO1CD_THEMARBLESEA,
        ECCO1CD_THELIBRARY,
        ECCO1CD_DEEPCITY,
        ECCO1CD_CITYOFFOREVER1,
        ECCO1CD_JURASSICBEACH,
        ECCO1CD_PTERANODONPOND,
        ECCO1CD_ORIGINBEACH,
        ECCO1CD_TRILOBITECIRCLE,
        ECCO1CD_DARKWATER,
        ECCO1CD_DEEPWATER2,
        ECCO1CD_CITYOFFOREVER2,
        ECCO1CD_THETUBE,
        ECCO1CD_THEMACHINE,
        ECCO1CD_THELASTFIGHT
    ];

    if (flags == 0)
    {
        for (index = 0; index < table.length; index++)
            table[index]&= ECCO1_MASK_STAGEID;
    }

    return table;
}

function get_ecco1cd_table_stage_name()
{
    let table = [
        -1,
	"Undercaves",
	"The Vents",
	"The Lagoon",
	"Ridge Water",
	"Open Ocean",
	"Ice Zone",
	"Hard Water",
	"Cold Water", 
	"Island Zone",
	"Deep Water",
	"Deep Gate",
	"Ship Grave Sea",
	"Wreck Trap",
	"Sea of Silence",
	"Volcanic Reef",
	"The Marble Sea",
	"The Library",
	"Deep City",
	"City of Forever",
	"Jurassic Beach",
	"Pteranodon Pond",
	"Origin Beach",
	"Trilobite Circle",
	"Deep Water",
	"Deep Water",
	"City of Forever",
	"The Tube",
	"Welcome to the Machine",
        "The Last Fight"
    ];
	
    return table;
}

function get_ecco1cd_table_stage_description()
{
    table = [
        -1,
        "(s)A deep maze of caverns with no surface to the dry side. Songs of the sea sing of a giant danger in this place.\n\n(l)",
        "(s)Giant cracks in the ocean floor have strong upward currents of warm water. After the storm, songs of three trapped dolphins are heard here...\n\n(l)",
        "(s)The songs of the sea sing of the stone eating stars that live in this place. A dolphin sings for her trapped pod.\n\n(l)",
        "(s)Two cold water ponds connected by a maze of shell and stone. To pass ridge water one must have great knowledge of the sea.\n\n(l)",
        "(s)\nThe open ocea is cold and dangerous.\n\n\n(l)",
        "(s)Dark cold waters with few places to breath. Strange cold water creatures live in this place. Distant songs are heard but not understood.\n\n(l)",
        "(s)Water turns to slippery stone from the dark cold. There is great danger when the water stones move. The distant songs continue...\n\n(l)",
        "(s)Quiet songs of wisdom sing about the hard water called ice. The big blue is near.\n\n(l)",
        "(s)\nSeven islands in warmer waters.\n\n\n(l))",
        "(s)Ancient breathless passages run so deep that no songs of this place have yet been sung.\n\n(l)",
        "(s)Very few songs by singers who guard the entrance to the marble sea.\n\n(l)",
        "(s)\nBones of strange floating whales are found here, they are infested with dangerous fish.\n\n(l)",
        "(s)Dangerous caves with fierce currents. the turtles may help but not willingly\n\n(l)",
        -1,
        "(s)The sunken city if through the mountain of stone. Glyphs open passages in this place.\n\n(l)",
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
    ];

    return table;
}

function get_ecco1cd_table_stage_caption()
{
    let table = [
        -1,
        "ecco1_caption_undercaves",
        "ecco1_caption_home_bay",
        "ecco1_caption_home_bay",
        "ecco1_caption_home_bay",
        "ecco1_caption_home_bay",
        "ecco1_caption_ice_zone",
        "ecco1_caption_ice_zone",
        "ecco1_caption_big_blue",
        "ecco1_caption_home_bay",
        "ecco1_caption_deep_water",
        "ecco1_caption_deep_gate",
        "ecco1_caption_deep_gate",
        "ecco1_caption_deep_gate",
        "ecco1_caption_deep_gate",
        "ecco1_caption_deep_gate",
        "ecco1_caption_atlantis",
        "ecco1_caption_the_library",
        "ecco1_caption_atlantis",
        "ecco1_caption_city_of_forever",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_dark_water",
        "ecco1_caption_deep_water",
        "ecco1_caption_city_of_forever",
        "ecco1_caption_the_tube",
        "ecco1_caption_the_machine",
        "ecco1_caption_the_last_fight"
    ];

    return table;
}

function get_ecco1cd_table_stage_theme()
{
    let table = [
        -1,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_JURASSIC_BEACH,
        THEME_DEFAULT,
        THEME_DEFAULT,
        THEME_THE_MACHINE,
        THEME_THE_MACHINE,
        THEME_THE_LAST_FIGHT
    ];

    return table;
}

function validate_ecco1cd_undercaves(instance)
{
    let session = instance.ecco1_session;
    let version = session.mode;

    let stage_id = 0;
    let current_stage_id = 0;

    stage_id = ECCO1CD_UNDERCAVES & ECCO1_MASK_STAGEID;
    current_stage_id = session.stage_id & ECCO1_MASK_STAGEID;

    if (current_stage_id != stage_id)
        return 1;

    stage_id = get_ecco1_stage_id(session.stage_index, version, 1);
    current_stage_id = session.stage_id;

    if (current_stage_id == stage_id)
        return 0;

    invalid_ecco1_password(instance, ECCO1_CHARGE_SONAR | ECCO1_PERMA_KILL);
    return -1;
}

function validate_ecco1cd_thevents(instance)
{
    let session = instance.ecco1_session;
    let version = session.mode;

    let stage_id = 0;
    let current_stage_id = 0;

    stage_id = ECCO1CD_THEVENTS & ECCO1_MASK_STAGEID;
    current_stage_id = session.stage_id & ECCO1_MASK_STAGEID;

    if (current_stage_id != stage_id)
        return 1;

    stage_id = get_ecco1_stage_id(session.stage_index, version, 1);
    stage_id&= ~ECCO1_CHARGE_SONAR;

    current_stage_id = session.stage_id;
    current_stage_id&= ~ECCO1_CHARGE_SONAR;

    if (current_stage_id == stage_id)
        return 0;

    invalid_ecco1_password(instance, ECCO1_PERMA_KILL);
    return -1;
}

function validate_ecco1cd_deepwater2(instance)
{
    let session = instance.ecco1_session;
    let version = session.mode;

    let stage_id = 0;
    let current_stage_id = 0;

    stage_id = ECCO1CD_DEEPWATER2 & (ECCO1_MASK_STAGEID | ECCO1_TMACHINE_HOMEBAY);
    current_stage_id = session.stage_id & (ECCO1_MASK_STAGEID | ECCO1_TMACHINE_HOMEBAY);

    if (current_stage_id != stage_id)
        return 1;

    stage_id = get_ecco1_stage_id(session.stage_index, version, 1);
    stage_id&= ~(ECCO1_CHARGE_SONAR | ECCO1_PERMA_KILL);
    stage_id|= ECCO1_GLOBE_OBTAINED_DEFAULT_MASK;        

    current_stage_id = session.stage_id & ~(ECCO1_CHARGE_SONAR | ECCO1_PERMA_KILL);
    if (current_stage_id & ECCO1_GLOBE_OBTAINED_DEFAULT_MASK)
        current_stage_id|= ECCO1_GLOBE_OBTAINED_DEFAULT_MASK;

    if (current_stage_id == stage_id)
        return 0;

    invalid_ecco1_password(instance);
    return -1;
}

function validate_ecco1cd_password(instance)
{
    let session = instance.ecco1_session;
    let version = session.mode;

    let current_stage_id = 0;
    let stage_id = 0;

    let result = 0;

    if (session.error_id < 0)
    {
        invalid_ecco1_password(instance, 0);
        return -1;
    }

    result = validate_ecco1cd_undercaves(instance);
    if (result == 0 || result == -1) return result;

    result = validate_ecco1cd_thevents(instance);
    if (result == 0 || result == -1) return result;

    result = validate_ecco1cd_deepwater2(instance);
    if (result == 0 || result == -1) return result;

    current_stage_id = session.stage_id & ~(ECCO1_CHARGE_SONAR | ECCO1_PERMA_KILL);

    stage_id = get_ecco1_stage_id(session.stage_index, version, 1);
    stage_id&= ~(ECCO1_CHARGE_SONAR | ECCO1_PERMA_KILL);

    if (current_stage_id == stage_id)
        return 0;

    invalid_ecco1_password(instance, 0);
    return -1;
}

// END ecco1cd_stage_*
// BEGIN ecco1_stage_* 

function get_ecco1_stage_menu(id, version)
{
    let table = null;

    if (version == ECCO1JP_MEGADRIVE)
        table = get_ecco1jpmd_table_stage_menu();
    else if (version == ECCO1_SEGACD)
        table = get_ecco1cd_table_stage_menu();
    else
        table = get_ecco1md_table_stage_menu();

    if (id == -1) return table;
    return get_table_index(id, table);
}

function get_ecco1_stage_id(index, version, flags)
{
    let table = null;

    if (version == ECCO1JP_MEGADRIVE)
        table = get_ecco1jpmd_table_stage_id(flags);
    else if (version == ECCO1_SEGACD)
        table = get_ecco1cd_table_stage_id(flags);
    else
        table = get_ecco1md_table_stage_id(flags);

    if (index == -1) return table;
    return table[index];
}

function get_ecco1_stage_name(index, version)
{
    let table = null;

    if (version == ECCO1JP_MEGADRIVE)
        table = get_ecco1jpmd_table_stage_name();
    else if (version == ECCO1_SEGACD)
        table = get_ecco1cd_table_stage_name();
    else
        table = get_ecco1md_table_stage_name();

    if (index == -1)
        return "Invalid Password";

    else if (index >= table.length)
        return "Invalid Password";

    return table[index];
}

function get_ecco1_stage_description(index, version)
{   
    let table = null;

    if (version == ECCO1JP_MEGADRIVE)
        table = get_ecco1jpmd_table_stage_description();
    else if (version == ECCO1_SEGACD)
        table = get_ecco1cd_table_stage_description();
    else
        table = get_ecco1md_table_stage_description();

    if (index == -1)
        return "\n\n";

    else if (index >= table.length)
        return "\n\n";

    else if (table[index] == -1)
        return "\n\n";

    return table[index];
}

function get_ecco1_stage_caption(index, version)
{   
    let table = null;

    if (version == ECCO1JP_MEGADRIVE)
        table = get_ecco1jpmd_table_stage_caption();
    else if (version == ECCO1_SEGACD)
        table = get_ecco1cd_table_stage_caption();
    else
        table = get_ecco1md_table_stage_caption();

    if (index == -1)
        return "ecco1_caption_title_screen";

    else if (index >= table.length)
        return "ecco1_caption_title_screen";

    return table[index];
}

function get_ecco1_stage_theme(index, version)
{   
    let table = null;

    if (version == ECCO1JP_MEGADRIVE)
        table = get_ecco1jpmd_table_stage_theme();
    else if (version == ECCO1_SEGACD)
        table = get_ecco1cd_table_stage_theme();
    else
        table = get_ecco1md_table_stage_theme();

    if (index == -1)
        return THEME_DEFAULT;

    else if (index >= table.length)
        return THEME_DEFAULT;

    return table[index];
}

function validate_ecco1_password(instance)
{
    let session = instance.ecco1_session;
    let version = instance.ecco1_session.mode;

    if (version == ECCO1JP_MEGADRIVE)
    {
        if (validate_ecco1jpmd_password(instance) == -1)
            return -1;
    }
    else if (version == ECCO1_SEGACD)
    {
        if (validate_ecco1cd_password(instance) == -1)
            return -1;
    }
    else if (version == ECCO1_MEGADRIVE)
    {
        if (session.error_id < 0)
        {
            invalid_ecco1_password(instance);
            return -1;
        }

        else if ((session.stage_event == ECCO1_STORM_VORTEX) && (session.unlimited_air == 0))
        {         
            invalid_ecco1_password(instance);
            return -1;
        }
    }

    return 0;
}

// END ecco1_stage_*

function get_ecco2_table_stage_id(index, flags)
{
	let table = [
            -1,
	    ECCO2_HOMEBAY,
	    ECCO2_CRYSTALSPRINGS,
	    ECCO2_FAULTZONE,
	    ECCO2_TWOTIDES,
	    ECCO2_TRELLIASBAY,
	    ECCO2_SKYWAY, 
	    ECCO2_SKYTIDES,
	    ECCO2_TUBEOFMEDUSA,
	    ECCO2_AQUATUBEWAY,
	    ECCO2_SKYLANDS,
	    ECCO2_FINTOFEATHER,
	    ECCO2_EAGLESBAY,
	    ECCO2_ASTERITESCAVE,
	    ECCO2_THELOSTORCAS,
	    ECCO2_MAZEOFSTONE,
	    ECCO2_FOURISLANDS,
	    ECCO2_SEAOFDARKNESS,
	    ECCO2_VENTSOFMEDUSA,
	    ECCO2_GATEWAY,
	    ECCO2_SEAOFGREEN,
	    ECCO2_MORAYABYSS,
	    ECCO2_ASTERITESHOME,
	    ECCO2_SEAOFBIRDS,
	    ECCO2_THEEYE,
	    ECCO2_BIGWATER,
	    ECCO2_DEEPRIDGE,
	    ECCO2_THEHUNGRYONES,
	    ECCO2_SECRETCAVE,
	    ECCO2_LUNARBAY,
	    ECCO2_VORTEXFUTURE,
	    ECCO2_BLACKCLOUDS, 
	    ECCO2_GRAVITORBOX,
	    ECCO2_GLOBEHOLDER,
	    ECCO2_CONVERGENCE,
	    ECCO2_DARKSEA,
	    ECCO2_NEWMACHINE,
	    ECCO2_VORTEXQUEEN,
	    ECCO2_THEPOD,
	    ECCO2_EPILOGUE,
	    ECCO2_ATLANTIS,
	    ECCO2_FISHCITY,
	    ECCO2_CITYOFFOREVER,
	    ECCO2_SECRETPASSWORD,

	    ECCO2_INER,
	    ECCO2_INNUENDO,
	    ECCO2_TRANS, 
	    ECCO2_INSIDE
        ];

    if (flags == 0)
    {
        for (index = 0; index < table.length; index++)
            table[index]&= ECCO2_STAGE_ID_MASK;
    }

    return table;
}

function get_ecco2_table_stage_name(stage_id)
{
	let table = 
	[
            -1,
	    "Home Bay",
	    "Crystal Springs",
	    "Fault Zone",
	    "Two Tides",
	    "Trellia's Bay",
	    "Sky Way",
	    "Sky Tides",
	    "Tube of Medusa",
	    "Aqua Tubeway",
	    "Skylands",
	    "Fin to Feather",
	    "Eagles Bay",
	    "Asterite's Cave",
	    "The Lost Orcas",
	    "Maze of Stone",
	    "Four Islands",
	    "Sea of Darkness",
	    "Vents of Medusa",
	    "Gateway",
	    "Sea of Green",
	    "Moray Abyss",
	    "Asterite's Home",
	    "Sea of Birds",
	    "The Eye",
	    "Big Water",
	    "Deep Ridge",
	    "The Hungry Ones",
	    "Secret Cave",
	    "Lunar Bay",
	    "Vortex Future",
	    "Black Clouds",
	    "Gravitor Box",
	    "The Globe Holder",
	    "Convergence",
	    "Dark Sea",
	    "New Machine",
	    "Vortex Queen",
	    "The Pod",
	    "Epilogue",
	    "Atlantis",
	    "Fish City",
	    "City of Forever",
	    "Secret Password",

	    "Inter",
	    "Innuendo",
	    "Trans",
	    "Inside"
	];
	
	return table;
}

function t_ecco1_session()
{
    this.mode = ECCO1_MEGADRIVE;
    this.mode_key = "";
    this.mode_name = "";

    this.scenario_id = 0;
    this.scenario_key = "";
    this.scenario_name = "";

    this.stage_index = 0;
    this.stage_id = 0;
    this.stage_key = "";
    this.stage_name = "";
    this.stage_description = "";

    this.stage_event = 0;
    this.stage_event_key = "";
    this.stage_event_name = "";

    this.stage_caption = "";
    this.stage_theme = 0;

    this.globe_obtained = 0;
    this.globe_obtained_key = "";
    this.globe_obtained_name = "";

    this.unlimited_air = 0;
    this.charge_sonar = 0;
    this.perma_kill = 0;

    this.death_counter = 0;
    this.death_counter_key = "";
    this.death_counter_name = "";

    this.cheat_mode = 0;
    this.time_elapsed_hours = 0;
    this.time_elapsed_minutes = 0;
    this.time_elapsed_seconds = 0;
    this.time_elapsed_total_seconds = 0;
    this.time_elapsed = 0;
    this.frames_per_second = 0;

    this.password = "";
    this.password_suggestion = "";
    this.unencrypted_data = 0;

    this.debug_mode = 0;
    this.developer_mode = 1;

    this.error_id = 0;
}

function t_instance()
{
    this.event = null;
    this.version = 0;
    this.ecco1_session = null;
    this.text_generator = null;
}

function create_instance()
{
    let instance = new t_instance();

    instance.ecco1_session = new t_ecco1_session();

    instance.text_generator = create_text_generator();
    init_text_generator(instance.text_generator);

    return instance;
}

let instance = create_instance();

function ecco1_get_password(session)
{
    let password_record = null;

    password_record = ecco1_generate_password(
	session.stage_id & ECCO1_MASK_STAGEID,
	session.stage_id & ECCO1_MASK_STAGEFLAGS,
	session.death_counter,
	session.time_elapsed,
        session.mode);

    session.unencrypted_data = password_record.unencrypted_data;
    session.error_id = password_record.result;

    return password_record.password;
}

function set_ecco1_stage_caption(id)
{
    let table = [
        "ecco1_caption_title_screen",
        "ecco1_caption_selection_scr",
        "ecco1_caption_home_bay",
        "ecco1_caption_undercaves",
        "ecco1_caption_ice_zone",
        "ecco1_caption_big_blue",
        "ecco1_caption_deep_water",
        "ecco1_caption_deep_gate",
        "ecco1_caption_atlantis",
        "ecco1_caption_the_library",
        "ecco1_caption_city_of_forever",
        "ecco1_caption_jurassic_beach",
        "ecco1_caption_dark_water",
        "ecco1_caption_the_tube",
        "ecco1_caption_the_machine",
        "ecco1_caption_the_stomach",
        "ecco1_caption_the_last_fight",
        "ecco1_caption_storm",
        "ecco1_caption_asterite_first_encounter",
        "ecco1_caption_time_machine_jurassic",
        "ecco1_caption_asterite_return_globe",
        "ecco1_caption_time_machine_home",
        "ecco1_caption_storm_tube",
        "ecco1_caption_time_machine_title",
        "ecco1_caption_time_machine_outoforder",
        "ecco1_caption_deepwater_noexit",
        "ecco1_caption_deepwater_trapped",
        "ecco1_caption_preasterite_fight"
    ];

    let index = 0;

    for (index = 0; index < table.length; index++)
    {
        if (id == table[index])
            set_inline_visibility(table[index], 1); 
        else
            set_inline_visibility(table[index], 0); 
    }
}

function update_ecco1_debug_mode(instance)
{
    let unencrypted_data = 0;
    let time_elapsed = 0;
    let stage_id = 0;
    let air_globe = 0;
    let stage_event = 0;
    let special_abilities = 0;
    let death_counter = 0;

    let session = instance.ecco1_session;

    set_block_visibility("panel_debug_mode", 0);
    if (session.debug_mode == 1)
        set_block_visibility("panel_debug_mode", 1);

    unencrypted_data = session.unencrypted_data;
    time_elapsed = unencrypted_data & 0xffff;
    stage_id = (unencrypted_data >>> 16) & 0x1f;
    air_globe = (unencrypted_data >>> 21) & 0xf;

    stage_event = unencrypted_data >>> 25;
    stage_event = stage_event << 1;
    stage_event&= 0x7;

    special_abilities = (unencrypted_data >>> 27) & 0x18;
    death_counter = (unencrypted_data >>> 27) & 0x7;

    unencrypted_data = unencrypted_data.toString(16).toUpperCase();
    time_elapsed = time_elapsed.toString(16).toUpperCase();
    stage_id = stage_id.toString(16).toUpperCase();
    air_globe = air_globe.toString(16).toUpperCase();
    stage_event = stage_event.toString(16).toUpperCase();
    special_abilities = special_abilities.toString(16).toUpperCase();
    death_counter = death_counter.toString(16).toUpperCase();

    document.getElementById("ecco1_label_unencrypted_data").innerHTML = unencrypted_data;
    document.getElementById("ecco1_label_debug_time_elapsed").innerHTML = time_elapsed;
    document.getElementById("ecco1_label_debug_stage_id").innerHTML = stage_id;
    document.getElementById("ecco1_label_debug_air_globe").innerHTML = air_globe;
    document.getElementById("ecco1_label_debug_stage_event").innerHTML = stage_event;
    document.getElementById("ecco1_label_debug_special_abilities").innerHTML = special_abilities;
    document.getElementById("ecco1_label_debug_death_counter").innerHTML = death_counter;
}

function update_ecco1_stage_attributes(instance)
{
    let session = instance.ecco1_session;
    let stage_id = 0;

    if ((session.developer_mode == 1) ||
        (session.mode == ECCO1_MEGADRIVE))
    {
        set_block_visibility("dialog_stage_event", 1);
        set_block_visibility("dialog_globe_obtained", 1);
        set_block_visibility("menu_item_ecco1_globe_02", 1);
        set_block_visibility("menu_item_ecco1_globe_07", 1);
        set_block_visibility("menu_item_ecco1_globe_08", 1);
        set_block_visibility("menu_item_ecco1_globe_09", 1);

        set_block_visibility("block_ecco1_special_abilities", 1);
        set_block_visibility("menu_item_unlimited_air", 1);
        set_block_visibility("block_ecco1_charge", 1);
        set_block_visibility("block_ecco1_kill", 1);
 
        return; 
    }

    // DEBUG: Although Deepwater ID is the same it could be different.
    stage_id = session.stage_id;
    if ((session.mode == ECCO1JP_MEGADRIVE) ||
        (session.mode == ECCO1_SEGACD))
    {
        switch (stage_id)
        {
            case ECCO1JPMD_DEEPWATER2:
            case ECCO1CD_DEEPWATER2:
            {
                set_block_visibility("dialog_stage_event", 0);
                set_block_visibility("dialog_globe_obtained", 1);
                set_block_visibility("menu_item_ecco1_globe_02", 0);
                set_block_visibility("menu_item_ecco1_globe_07", 0);
                set_block_visibility("menu_item_ecco1_globe_08", 0);
                set_block_visibility("menu_item_ecco1_globe_09", 0);
 
                set_block_visibility("block_ecco1_special_abilities", 1);
                set_block_visibility("menu_item_unlimited_air", 0);
                set_block_visibility("block_ecco1_charge", 1);
                set_block_visibility("block_ecco1_kill", 1);
 
                return;
            }
        } 
    }

    stage_id = stage_id & ECCO1_MASK_STAGEID;

    if (session.mode == ECCO1JP_MEGADRIVE)
    {
        if (stage_id == (ECCO1JPMD_SELECTIONSCR & ECCO1_MASK_STAGEID))
        {
            set_block_visibility("dialog_stage_event", 1);
            set_block_visibility("dialog_globe_obtained", 1);
            set_block_visibility("menu_item_ecco1_globe_02", 1);
            set_block_visibility("menu_item_ecco1_globe_07", 1);
            set_block_visibility("menu_item_ecco1_globe_08", 1);
            set_block_visibility("menu_item_ecco1_globe_09", 1);

            set_block_visibility("block_ecco1_special_abilities", 1);
            set_block_visibility("menu_item_unlimited_air", 1);
            set_block_visibility("block_ecco1_charge", 1);
            set_block_visibility("block_ecco1_kill", 1);

            return;
        }
    }

    if (session.mode == ECCO1_SEGACD)
    {
        switch (stage_id)
        {
            case (ECCO1CD_UNDERCAVES & ECCO1_MASK_STAGEID):
            {
                set_block_visibility("dialog_stage_event", 0);
                set_block_visibility("dialog_globe_obtained", 0);
                set_block_visibility("menu_item_ecco1_globe_02", 1);
                set_block_visibility("menu_item_ecco1_globe_07", 1);
                set_block_visibility("menu_item_ecco1_globe_08", 1);
                set_block_visibility("menu_item_ecco1_globe_09", 1);

                set_block_visibility("block_ecco1_special_abilities", 0);
                set_block_visibility("menu_item_unlimited_air", 0);
                set_block_visibility("block_ecco1_charge", 1);
                set_block_visibility("block_ecco1_kill", 1);

                return;
            }

            case (ECCO1CD_THEVENTS & ECCO1_MASK_STAGEID):
            {
                set_block_visibility("dialog_globe_obtained", 0);
                set_block_visibility("menu_item_ecco1_globe_02", 1);
                set_block_visibility("menu_item_ecco1_globe_07", 1);
                set_block_visibility("menu_item_ecco1_globe_08", 1);
                set_block_visibility("menu_item_ecco1_globe_09", 1);

                set_block_visibility("block_ecco1_special_abilities", 1);
                set_block_visibility("menu_item_unlimited_air", 0);
                set_block_visibility("block_ecco1_charge", 1);
                set_block_visibility("block_ecco1_kill", 0);
 
                return;
            }
        }
    }

    set_block_visibility("dialog_stage_event", 0);
    set_block_visibility("dialog_globe_obtained", 0);
    set_block_visibility("menu_item_ecco1_globe_02", 1);
    set_block_visibility("menu_item_ecco1_globe_07", 1);
    set_block_visibility("menu_item_ecco1_globe_08", 1);
    set_block_visibility("menu_item_ecco1_globe_09", 1);

    set_block_visibility("block_ecco1_special_abilities", 1);
    set_block_visibility("menu_item_unlimited_air", 0);
    set_block_visibility("block_ecco1_charge", 1);
    set_block_visibility("block_ecco1_kill", 1);
}

function update_ecco1_developer_mode(instance)
{
    let session = instance.ecco1_session;
 
    update_ecco1_stage_attributes(instance);

    set_block_visibility("dialog_stage_event", session.developer_mode);
    set_block_visibility("menu_item_unlimited_air", session.developer_mode);
}

function update_ecco1_menu_all(instance)
{
    let table = null;
    let session = instance.ecco1_session;
    let version = session.mode;

    table = get_menu_ecco1_scenario_resource();
    dialog_panel_highlight(session.scenario_key, table);

    table = get_ecco1_stage_menu(-1, version)
    session.stage_key = table[session.stage_index];
    menu2_item_highlight(session.stage_key, table);

    table = get_menu_ecco1_stage_event_resource();
    session.stage_event_key = get_table_key(session.stage_event, table);
    menu_item_highlight(session.stage_event_key, table);

    table = get_menu_ecco1_globe_obtained_resource();
    session.globe_obtained_key = get_table_key(session.globe_obtained, table);
    menu_item_highlight(session.globe_obtained_key, table);

    table = get_menu_ecco1_death_counter_resource();
    session.death_counter_key = get_table_key(session.death_counter, table);
    menu_item_highlight(session.death_counter_key, table);

    session.scenario_name = ecco1_get_scenario_name(session.scenario_key);
    session.stage_name = get_ecco1_stage_name(session.stage_index, version);

    session.stage_event_name = ecco1_get_stage_event_name(session.stage_event_key);
    session.globe_obtained_name = ecco1_get_globe_obtained_name(session.globe_obtained_key);
    session.death_counter_name = ecco1_get_death_counter_name(session.death_counter_key);

    document.getElementById("ecco1_label_scenario").innerHTML = session.scenario_name;
    document.getElementById("ecco1_label_stage").innerHTML = session.stage_name;
    document.getElementById("ecco1_label_stage_event").innerHTML = session.stage_event_name;
    document.getElementById("ecco1_label_globe_obtained").innerHTML = session.globe_obtained_name;
    document.getElementById("ecco1_label_death_counter").innerHTML = session.death_counter_name;
}

function update_ecco1_form(instance)
{
    let index = 0;
    let table = null;
    let session = instance.ecco1_session;

    disable_all_panels();

    update_ecco1_debug_mode(instance);
    update_ecco1_menu_all(instance);

    document.getElementById("ecco1_label_password_suggestion").innerHTML = session.password_suggestion;
    document.getElementById("ecco1_textin_decoded_password").value = session.password;

    switch_toggle("ecco1_switch_air", session.unlimited_air);
    switch_toggle("ecco1_switch_charge", session.charge_sonar);
    switch_toggle("ecco1_switch_kill", session.perma_kill);
    switch_toggle("ecco1_switch_50_frames", session.frames_per_second);

    enable_spheres(session.stage_id);
    ecco1_enable_globe_icon(session.globe_obtained);

    session.stage_description = get_ecco1_stage_description(session.stage_index, session.mode);
    session.stage_theme = get_ecco1_stage_theme(session.stage_index, session.mode);

    validate_ecco1_password(instance);
    set_ecco1_stage_caption(session.stage_caption)

    raw_string = session.stage_name + "\n"
    raw_string+= session.stage_description;
    raw_string+= session.password;
 
    text_generator_set_output(instance.text_generator, raw_string);
    instance.text_generator.config.THEME = session.stage_theme; 

    set_block_visibility("panel_ecco1", 1);
}

// BEGIN: menu_ecco_game

function get_ecco1md_mode(instance)
{
    let session = instance.ecco1_session;
    let frames_per_second = 0;

    instance.version = ECCO1_MEGADRIVE;
    session.mode = ECCO1_MEGADRIVE;

    session.debug_mode = 0;
    session.developer_mode = 1;

    switch_toggle("ecco_switch_debug_mode", session.debug_mode);
    switch_toggle("ecco_switch_developer_mode", session.developer_mode);

    session.time_elapsed = 64;

    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = 60;

    session.time_elapsed_total_seconds = session.time_elapsed/frames_per_second;
    session.time_elapsed_total_seconds = Math.trunc(session.time_elapsed_total_seconds); 

    document.getElementById("ecco_textin_time_elapsed_total_seconds").value = session.time_elapsed_total_seconds;
    document.getElementById("ecco_textin_time_elapsed").value = session.time_elapsed;

    update_ecco_time_elapsed(instance);

    set_block_visibility("dialog_scenarios", 1);

    update_ecco1_developer_mode(instance);
    menu_ecco1_stage_handler(instance, null, get_ecco1md_table_stage_menu())
}

function get_ecco1jpmd_mode(instance)
{
    let session = instance.ecco1_session;
    let frames_per_second = 0;

    instance.version = ECCO1JP_MEGADRIVE;
    session.mode = ECCO1JP_MEGADRIVE;

    session.debug_mode = 0;
    session.developer_mode = 0;

    switch_toggle("ecco_switch_debug_mode", session.debug_mode);
    switch_toggle("ecco_switch_developer_mode", session.developer_mode);

    session.time_elapsed = 64;

    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = 60;

    session.time_elapsed_total_seconds = session.time_elapsed/frames_per_second;
    session.time_elapsed_total_seconds = Math.trunc(session.time_elapsed_total_seconds); 

    document.getElementById("ecco_textin_time_elapsed_total_seconds").value = session.time_elapsed_total_seconds;
    document.getElementById("ecco_textin_time_elapsed").value = session.time_elapsed;

    update_ecco_time_elapsed(instance);

    set_block_visibility("dialog_scenarios", 0);

    update_ecco1_developer_mode(instance);
    menu_ecco1_stage_handler(instance, null, get_ecco1jpmd_table_stage_menu())
}

function get_ecco1cd_mode(instance)
{
    let session = instance.ecco1_session;
    let frames_per_second = 0;

    instance.version = ECCO1_SEGACD;
    session.mode = ECCO1_SEGACD;

    session.debug_mode = 0;
    session.developer_mode = 0;

    switch_toggle("ecco_switch_debug_mode", session.debug_mode);
    switch_toggle("ecco_switch_developer_mode", session.developer_mode);

    session.time_elapsed = 64;

    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = 60;

    session.time_elapsed_total_seconds = session.time_elapsed/frames_per_second;
    session.time_elapsed_total_seconds = Math.trunc(session.time_elapsed_total_seconds); 

    document.getElementById("ecco_textin_time_elapsed_total_seconds").value = session.time_elapsed_total_seconds;
    document.getElementById("ecco_textin_time_elapsed").value = session.time_elapsed;

    update_ecco_time_elapsed(instance);

    set_block_visibility("dialog_scenarios", 0);

    update_ecco1_developer_mode(instance);
    menu_ecco1_stage_handler(instance, null, get_ecco1cd_table_stage_menu())
}

function get_ecco_game_name(id)
{
    let table = [
        "menu_ecco_game_03", "Ecco the Dolphin for Mega Drive/Genesis",
        "menu_ecco_game_04", "Ecco the Dolphin Japanese Version for Mega Drive",
        "menu_ecco_game_05", "Ecco the Dolphin Revision 1 Prototype for Sega Genesis",
        "menu_ecco_game_06", "Ecco the Dolphin for Mega CD/Sega CD",
        "menu_ecco_game_07", "Ecco 2: The Tides of Time for Mega Drive/Genesis/Sega CD: Decoder Only"
    ];

    let result = get_table_value(id, table);
    if (result == null) result = "";

    return result;
}

function get_ecco_menu_ecco_game_resource()
{
    let table = [
        "menu_ecco_game_01", -1,
        "menu_ecco_game_02", -2,
        "menu_ecco_game_03", ECCO1_MEGADRIVE,
        "menu_ecco_game_04", ECCO1JP_MEGADRIVE,
        "menu_ecco_game_05", ECCO1JP_MEGADRIVE,
        "menu_ecco_game_06", ECCO1_SEGACD,
        "menu_ecco_game_07", ECCO2_MEGADRIVE
    ];

    return table;
}

function menu_ecco_game_handler(instance, id, table)
{
    let session = instance.ecco1_session;
    let mode = 0;

    if (id == null) id = "menu_ecco_game_03";
    mode = get_table_value(id, table);

    disable_all_panels();    

    switch (mode)
    {
        case -1:
        {
            set_block_visibility("panel_ecco1", 1);
            return;
        }

        case ECCO1_MEGADRIVE:
        {
            get_ecco1md_mode(instance);
            set_block_visibility("panel_ecco1", 1);
            break;
        }

        case ECCO1JP_MEGADRIVE:
        {
            get_ecco1jpmd_mode(instance);
            set_block_visibility("panel_ecco1", 1);
            break;
        }

        case ECCO1_SEGACD:
        {
            get_ecco1cd_mode(instance);
            set_block_visibility("panel_ecco1", 1);
            break;
        }

        case ECCO2_MEGADRIVE:
        {
            instance.version = ECCO2_MEGADRIVE;

            text_generator_set_output(instance.text_generator, "Ecco 2 Password Decoder");
            instance.text_generator.config.THEME = THEME_DEFAULT; 

            set_block_visibility("panel_ecco2", 1);
            break;
        }

        default:
        {
            set_block_visibility("panel_about", 1);
            return;
        }
    }

    session.mode = mode;
    session.mode_key = id;
    session.mode_name = get_ecco_game_name(id);

    document.getElementById("ecco_label_game").innerHTML = session.mode_name;
    document.getElementById("ecco2_label_game").innerHTML = session.mode_name;

    menu_item_highlight(session.mode_key, table);
}

enable_menu(instance, get_ecco_menu_ecco_game_resource(), menu_ecco_game_handler);
enable_menu(instance, get_ecco_menu_ecco_game_resource(), menu_ecco_game_handler);

// END: menu_ecco_game
// BEGIN: menu_ecco1_scenario

function get_ecco1_scenario_caption(id)
{
    let table = [
        "menu_ecco1_scenario_03", "ecco1_caption_storm",
        "menu_ecco1_scenario_04", "ecco1_caption_asterite_first_encounter",
        "menu_ecco1_scenario_05", "ecco1_caption_time_machine_jurassic",
        "menu_ecco1_scenario_06", "ecco1_caption_asterite_return_globe",
        "menu_ecco1_scenario_07", "ecco1_caption_time_machine_home",
        "menu_ecco1_scenario_08", "ecco1_caption_storm_tube",
        "menu_ecco1_scenario_09", "ecco1_caption_time_machine_title",
        "menu_ecco1_scenario_10", "ecco1_caption_time_machine_outoforder",
        "menu_ecco1_scenario_11", "ecco1_caption_deepwater_noexit",
        "menu_ecco1_scenario_12", "ecco1_caption_deepwater_trapped",
        "menu_ecco1_scenario_13", "ecco1_caption_preasterite_fight"
    ];

    let result = get_table_value(id, table);
    if (result == null) result = "ecco1_caption_title_screen";

    return result;
}

function ecco1_get_scenario_name(id)
{
    let table = [
        "menu_ecco1_scenario_03", "Home Bay just before The Storm",
        "menu_ecco1_scenario_04", "Ecco encounters the Asterite for the first time",
        "menu_ecco1_scenario_05", "Time Machine sends Ecco to Jurassic Beach",
        "menu_ecco1_scenario_06", "Ecco returns the Asterite's missing globe",
        "menu_ecco1_scenario_07", "Time Machine sends Ecco to Home Bay just before The Storm",
        "menu_ecco1_scenario_08", "The Storm sends Ecco to The Tube",
        "menu_ecco1_scenario_09", "Time Machine sends Ecco to the Title Screen",
        "menu_ecco1_scenario_10", "Time Machine Out of Order",
        "menu_ecco1_scenario_11", "Deep Water Stage has no exit",
        "menu_ecco1_scenario_12", "Ecco gets trapped in the Asterite's Cave",
        "menu_ecco1_scenario_13", "Prehistoric Asterite respawns after it is defeated"
    ];

    let result = get_table_value(id, table);
    if (result == null) result = "User Defined";

    return result;
}

function get_menu_ecco1_scenario_resource()
{
    let table = [
        "menu_ecco1_scenario_01", -1,
        "menu_ecco1_scenario_02", -2,
        "menu_ecco1_scenario_03", ECCO1_SCENARIO_STORM_DROPBACK,
        "menu_ecco1_scenario_04", ECCO1_SCENARIO_DEEPWATER_FINDGLOBE,
        "menu_ecco1_scenario_05", ECCO1_SCENARIO_CITYOFFOREVER_TOJURASSIC,
        "menu_ecco1_scenario_06", ECCO1_SCENARIO_DEEPWATER_RETURNGLOBE,
        "menu_ecco1_scenario_07", ECCO1_SCENARIO_CITYOFFOREVER_TOHOMEBAY,
        "menu_ecco1_scenario_08", ECCO1_SCENARIO_STORM_VORTEX,
        "menu_ecco1_scenario_09", ECCO1_SCENARIO_TMACHINE_TITLESCREEN,
        "menu_ecco1_scenario_10", ECCO1_SCENARIO_TMACHINE_DOESNTWORK,
        "menu_ecco1_scenario_11", ECCO1_SCENARIO_ASTERITECOMPLETE_NOEXITSTAGE,
        "menu_ecco1_scenario_12", ECCO1_SCENARIO_ASTERITECOMPLETE_TRAPPEDINCAVE,
        "menu_ecco1_scenario_13", ECCO1_SCENARIO_PREASTERITE_COMMUNICATES
    ];

    return table;
}

function menu_ecco1_scenario_handler(instance, id, table)
{
    let session = instance.ecco1_session;    
    let scenario_id = 0;

    scenario_id = get_table_value(id, table);

    if (scenario_id == -1)
    {
        disable_all_panels();
        set_block_visibility("panel_ecco1", 1);
        return;
    }
    else if (scenario_id == -2)
    {
        session.scenario_key = "";
        session.stage_caption = get_ecco1_stage_caption(session.stage_id)

        update_ecco1_form(instance);
        return;
    }

    session.scenario_id = scenario_id;
    session.scenario_key = id;
    session.scenario_name = ecco1_get_scenario_name(id);

    session.stage_id = scenario_id;
    session.stage_event = scenario_id & ECCO1_STAGE_EVENT_MASK;
    session.globe_obtained = scenario_id & ECCO1_GLOBE_OBTAINED_MASK;
    session.unlimited_air = scenario_id & ECCO1_UNLIMITED_AIR;
    session.charge_sonar = scenario_id & ECCO1_CHARGE_SONAR;
    session.perma_kill = scenario_id & ECCO1_PERMA_KILL;
    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;

    let result = get_ecco1_stage_id(-1, session.mode, 0);
    session.stage_index = get_table_index(session.stage_id & ECCO1_MASK_STAGEID, result);

    session.stage_caption = get_ecco1_scenario_caption(id)
    update_ecco1_form(instance);
}

enable_menu(instance, get_menu_ecco1_scenario_resource(), menu_ecco1_scenario_handler);

// END: menu_ecco1_scenario
// BEGIN: menu_ecco1_stage

function menu_ecco1_stage_handler(instance, id, table)
{
    let session = instance.ecco1_session;
    let version = session.mode;

    let index = 0;
    let stage_id = 0;

    if (id == null)
    {
        if (version == ECCO1JP_MEGADRIVE)
            id = "menu_ecco1jpmd_stage_03";
        else if (version == ECCO1_SEGACD)
            id = "menu_ecco1cd_stage_02";
        else
            id = "menu_ecco1md_stage_03";
    }
    
    index = get_table_index(id, table);
    stage_id = get_ecco1_stage_id(index, version, 1);

    if (stage_id == -1)
    {
        disable_all_panels();
        set_block_visibility("panel_ecco1", 1);
        return;
    }

    session.scenario_key = "";

    session.stage_index = index;
    session.stage_id = stage_id;
    session.stage_key = id;

    session.stage_event = session.stage_id & ECCO1_STAGE_EVENT_MASK;
    session.globe_obtained = session.stage_id & ECCO1_GLOBE_OBTAINED_MASK;
    session.unlimited_air = session.stage_id & ECCO1_UNLIMITED_AIR;
    session.charge_sonar = session.stage_id & ECCO1_CHARGE_SONAR;
    session.perma_kill = session.stage_id & ECCO1_PERMA_KILL;

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;

    session.stage_caption = get_ecco1_stage_caption(session.stage_index, version);

    update_ecco1_stage_attributes(instance);
    update_ecco1_form(instance);
}

enable_menu2(instance, get_ecco1md_table_stage_menu(), menu_ecco1_stage_handler);
enable_menu2(instance, get_ecco1jpmd_table_stage_menu(), menu_ecco1_stage_handler);
enable_menu2(instance, get_ecco1cd_table_stage_menu(), menu_ecco1_stage_handler);

// END: menu_ecco1_stage
// BEGIN: menu_ecco1_stage_event

function ecco1_get_stage_event_name(key)
{
    let table = [
        "menu_ecco1_stage_event_02", "Time Machine sends Ecco to Jurassic Beach",
        "menu_ecco1_stage_event_03", "Time Machine sends Ecco to Home Bay",
        "menu_ecco1_stage_event_04", "The Storm sends Ecco to The Tube",
        "menu_ecco1_stage_event_05", "Stage Event 6 (Unused)"
    ];

    let result = get_table_value(key, table);
    if (result == null) result = "Custom Stage Event";

    return result;
}

function get_menu_ecco1_stage_event_resource()
{
    let table = [
        "menu_ecco1_stage_event_01", -1,
        "menu_ecco1_stage_event_02", ECCO1_TMACHINE_JURASSIC,
        "menu_ecco1_stage_event_03", ECCO1_TMACHINE_HOMEBAY,
        "menu_ecco1_stage_event_04", ECCO1_STORM_VORTEX,
        "menu_ecco1_stage_event_05", ECCO1_STAGE_EVENT_6
    ];

    return table;
}

function menu_ecco1_stage_event_handler(instance, id, table)
{
    let index = 0;
    let stage_event = 0;
    let session = null;    

    stage_event = get_table_value(id, table);

    if (stage_event == -1)
    {
        disable_all_panels();
        set_block_visibility("panel_ecco1", 1);
        return;
    }

    session = instance.ecco1_session;    

    session.scenario_key = "";
    session.stage_id = (session.stage_id & ~ECCO1_STAGE_EVENT_MASK) | stage_event;
    session.stage_event = stage_event;
    session.stage_event_name = ecco1_get_stage_event_name(id);

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;

    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
}

enable_menu(instance, get_menu_ecco1_stage_event_resource(), menu_ecco1_stage_event_handler);

// END: menu_ecco1_stage_event
// BEGIN: menu_ecco1_globe_obtained

function ecco1_get_globe_obtained_name(id)
{
    let table = [
        "menu_ecco1_globe_02", "No Globe Obtained",
        "menu_ecco1_globe_03", "&nbsp; Red Globe",
        "menu_ecco1_globe_04", "&nbsp; Brown Globe",
        "menu_ecco1_globe_05", "&nbsp; Purple Globe",
        "menu_ecco1_globe_06", "&nbsp; Green Globe",
        "menu_ecco1_globe_07", "&nbsp; Purple Globe 5 (Unused)",
        "menu_ecco1_globe_08", "&nbsp; Purple Globe 6 (Unused)",
        "menu_ecco1_globe_09", "&nbsp; Purple Globe 7 (Unused)",
    ];

    let result = get_table_value(id, table);
    if (result == null) result = "No Globe Obtained";

    return result;
}

function get_menu_ecco1_globe_obtained_resource()
{
    let table = [
        "menu_ecco1_globe_01", -1,
        "menu_ecco1_globe_02", 0,
        "menu_ecco1_globe_03", ECCO1_GLOBE_OBTAINED_RED,
        "menu_ecco1_globe_04", ECCO1_GLOBE_OBTAINED_BROWN,
        "menu_ecco1_globe_05", ECCO1_GLOBE_OBTAINED_PURPLE,
        "menu_ecco1_globe_06", ECCO1_GLOBE_OBTAINED_GREEN,
        "menu_ecco1_globe_07", ECCO1_GLOBE_OBTAINED_PURPLE5,
        "menu_ecco1_globe_08", ECCO1_GLOBE_OBTAINED_PURPLE6,
        "menu_ecco1_globe_09", ECCO1_GLOBE_OBTAINED_PURPLE7
    ];

    return table;
}

function menu_ecco1_globe_obtained_handler(instance, id, table)
{
    let index = 0;
    let globe_obtained = 0;
    let session = instance.ecco1_session;    

    globe_obtained = get_table_value(id, table);

    if (globe_obtained == -1)
    {
        disable_all_panels();
        set_block_visibility("panel_ecco1", 1);
        return;
    }

    session = instance.ecco1_session;    

    session.scenario_key = "";
    session.stage_id = (session.stage_id & ~ECCO1_GLOBE_OBTAINED_MASK) | globe_obtained;
    session.globe_obtained = globe_obtained;

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;

    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
}

enable_menu(instance, get_menu_ecco1_globe_obtained_resource(), menu_ecco1_globe_obtained_handler);

// END: menu_ecco1_globe_obtained
// BEGIN: menu_ecco1_death_counter

function ecco1_get_death_counter_name(key)
{
    let table = [
        "menu_ecco1_death_counter_02", "No deaths play through!",
        "menu_ecco1_death_counter_03", "Died once!",
        "menu_ecco1_death_counter_04", "Died twice!",
        "menu_ecco1_death_counter_05", "Died three times",
        "menu_ecco1_death_counter_06", "Died four times!",
        "menu_ecco1_death_counter_07", "Died five times!",
        "menu_ecco1_death_counter_08", "Died six times!",
        "menu_ecco1_death_counter_09", "Died seven or more times!"
    ];

    let result = get_table_value(key, table);
    if (result == null) result = "Unknown";

    return result;
}

function get_menu_ecco1_death_counter_resource()
{
    let table = [
        "menu_ecco1_death_counter_01", -1,
        "menu_ecco1_death_counter_02", 7,
        "menu_ecco1_death_counter_03", 6,
        "menu_ecco1_death_counter_04", 5,
        "menu_ecco1_death_counter_05", 4,
        "menu_ecco1_death_counter_06", 3,
        "menu_ecco1_death_counter_07", 2,
        "menu_ecco1_death_counter_08", 1,
        "menu_ecco1_death_counter_09", 0
    ];

    return table;
}

function menu_ecco1_death_counter_handler(instance, id, table)
{
    let index = 0;
    let death_counter = 0;
    let session = null;    

    death_counter = get_table_value(id, table);

    if (death_counter == -1)
    {
        disable_all_panels();
        set_block_visibility("panel_ecco1", 1);
        return;
    }

    session = instance.ecco1_session;    

    session.death_counter = death_counter;
    session.death_counter_name = ecco1_get_death_counter_name(id);

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;
    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);

    update_ecco1_form(instance);
}

enable_menu(instance, get_menu_ecco1_death_counter_resource(), menu_ecco1_death_counter_handler);

// END: menu_ecco1_death_counter
// BEGIN: ecco1_control_*

set_event_listener(instance, "ecco1_control_scenarios", 0, "click", (value) =>
{
    disable_all_panels();
    set_block_visibility("panel_ecco1_scenarios", 1);
});

set_event_listener(instance, "ecco_control_game", 0, "click", (value) =>
{
    disable_all_panels();
    set_block_visibility("panel_game", 1);
});

set_event_listener(instance, "ecco2_control_game", 0, "click", (value) =>
{
    disable_all_panels();
    set_block_visibility("panel_game", 1);
});

set_event_listener(instance, "ecco1_control_stage", 0, "click", (value) =>
{
    let session = instance.ecco1_session;

    disable_all_panels();

    if (session.mode == ECCO1JP_MEGADRIVE)
        set_block_visibility("panel_ecco1jpmd_stage", 1);
    else if (session.mode == ECCO1_SEGACD)
        set_block_visibility("panel_ecco1cd_stage", 1);
    else set_block_visibility("panel_ecco1_stage", 1);
});

set_event_listener(instance, "ecco1_control_stage_event", 0, "click", (value) =>
{
    disable_all_panels();
    set_block_visibility("panel_ecco1_stage_event", 1);
});

set_event_listener(instance, "ecco1_control_globe_obtained", 0, "click", (value) =>
{
    disable_all_panels();
    set_block_visibility("panel_ecco1_globe_obtained", 1);
});

set_event_listener(instance, "ecco1_control_death_counter", 0, "click", (value) =>
{
    disable_all_panels();
    set_block_visibility("panel_ecco1_death_counter", 1);
});

set_event_listener(instance, "control_about_ok", 0, "click", (value) =>
{
    let version = instance.version;

    disable_all_panels();
    switch (version)
    {
        case ECCO1_MEGADRIVE:
        case ECCO1JP_MEGADRIVE:
        case ECCO1_SEGACD:
            set_block_visibility("panel_ecco1", 1);
            break;
        case ECCO2_MEGADRIVE:
            set_block_visibility("panel_ecco2", 1);
            break;
    }
});

// END: ecco1_control_*
// BEGIN: ecco1_textin_time_elapsed_*

function ecco_textin_time_elapsed_hms_handler(value)
{
    let frames_per_second = 0;
    let session = instance.ecco1_session;

    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = 60;

    session.time_elapsed_hours = document.getElementById("ecco_textin_time_elapsed_hours").value;
    session.time_elapsed_minutes = document.getElementById("ecco_textin_time_elapsed_minutes").value;
    session.time_elapsed_seconds = document.getElementById("ecco_textin_time_elapsed_seconds").value;

    if (session.time_elapsed_hours == "")
        session.time_elapsed_hours = 0;
    if (session.time_elapsed_minutes == "")
        session.time_elapsed_minutes = 0;
    if (session.time_elapsed_seconds == "")
        session.time_elapsed_seconds = 0;

    if (isNaN(session.time_elapsed_hours))
        session.time_elapsed_hours = 0;
    if (isNaN(session.time_elapsed_minutes))
        session.time_elapsed_minutes = 0;
    if (isNaN(session.time_elapsed_seconds))
        session.time_elapsed_seconds = 0;

    session.time_elapsed_hours = parseInt(session.time_elapsed_hours);
    session.time_elapsed_minutes = parseInt(session.time_elapsed_minutes);
    session.time_elapsed_seconds = parseInt(session.time_elapsed_seconds);

    session.time_elapsed_total_seconds = (session.time_elapsed_hours * 60 * 60) + 
        (session.time_elapsed_minutes * 60) + session.time_elapsed_seconds;

    session.time_elapsed = session.time_elapsed_total_seconds * frames_per_second;

    document.getElementById("ecco_textin_time_elapsed_total_seconds").value = parseInt(session.time_elapsed_total_seconds, 10);
    document.getElementById("ecco_textin_time_elapsed").value = parseInt(session.time_elapsed, 10);

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;
 
    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
}

set_event_listener(instance, "ecco_textin_time_elapsed_hours", 0, "keyup", ecco_textin_time_elapsed_hms_handler);
set_event_listener(instance, "ecco_textin_time_elapsed_minutes", 0, "keyup", ecco_textin_time_elapsed_hms_handler);
set_event_listener(instance, "ecco_textin_time_elapsed_seconds", 0, "keyup", ecco_textin_time_elapsed_hms_handler);

function update_ecco_time_elapsed(instance)
{
    let session = null;

    session = instance.ecco1_session;

    session.time_elapsed_hours = session.time_elapsed_total_seconds/60/60;
    session.time_elapsed_minutes = (session.time_elapsed_total_seconds/60) % 60;
    session.time_elapsed_seconds = session.time_elapsed_total_seconds % 60;

    session.time_elapsed_hours = Math.trunc(session.time_elapsed_hours); 
    session.time_elapsed_minutes = Math.trunc(session.time_elapsed_minutes); 
    session.time_elapsed_seconds = Math.trunc(session.time_elapsed_seconds); 

    document.getElementById("ecco_textin_time_elapsed_hours").value = session.time_elapsed_hours;
    document.getElementById("ecco_textin_time_elapsed_minutes").value = session.time_elapsed_minutes;
    document.getElementById("ecco_textin_time_elapsed_seconds").value = session.time_elapsed_seconds;
};

set_event_listener(instance, "ecco_textin_time_elapsed_total_seconds", 0, "keyup", (value) =>
{
    let frames_per_second = 0;
    let session = instance.ecco1_session;

    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = 60;

    session.time_elapsed_total_seconds = document.getElementById("ecco_textin_time_elapsed_total_seconds").value

    if (session.time_elapsed_total_seconds == "")
        session.time_elapsed_total_seconds = 0;
    if (isNaN(session.time_elapsed_total_seconds))
        session.time_elapsed_total_seconds = 0;

    session.time_elapsed = session.time_elapsed_total_seconds * frames_per_second;
    document.getElementById("ecco_textin_time_elapsed").value = session.time_elapsed;

    update_ecco_time_elapsed(instance);

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;
 
    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
});

set_event_listener(instance, "ecco_textin_time_elapsed", 0, "keyup", (value) =>
{
    let frames_per_second = 0;
    let session = instance.ecco1_session;

    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = 60;

    session.time_elapsed = document.getElementById("ecco_textin_time_elapsed").value

    if (session.time_elapsed == "")
        session.time_elapsed = 0;
    if (isNaN(session.time_elapsed))
        session.time_elapsed = 0;

    session.time_elapsed_total_seconds = session.time_elapsed/frames_per_second;
    session.time_elapsed_total_seconds = Math.trunc(session.time_elapsed_total_seconds); 
    document.getElementById("ecco_textin_time_elapsed_total_seconds").value = session.time_elapsed_total_seconds;

    update_ecco_time_elapsed(instance);

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;
 
    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
});

function ecco1_switch_50_frames(instance, value)
{
    let frames_per_second = 0;
    let session = null;

    session = instance.ecco1_session;

    session.frames_per_second = 0;
    if (value == 1)
        session.frames_per_second = 50;

    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = 60;

    session.time_elapsed_total_seconds = session.time_elapsed/frames_per_second;
    session.time_elapsed_total_seconds = Math.trunc(session.time_elapsed_total_seconds); 

    document.getElementById("ecco_textin_time_elapsed_total_seconds").value = session.time_elapsed_total_seconds;
    document.getElementById("ecco_textin_time_elapsed").value = session.time_elapsed;

    update_ecco_time_elapsed(instance);

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;
 
    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
};

set_event_listener(instance, "ecco1_switch_50_frames_on", 0, "click", ecco1_switch_50_frames);
set_event_listener(instance, "ecco1_switch_50_frames_off", 1, "click", ecco1_switch_50_frames);

// END: ecco1_textin_time_elapsed_*
// BEGIN: ecco1_switch_*

function ecco1_switch_air(instance, value)
{
    let session = instance.ecco1_session;

    if (value == 1)
        session.unlimited_air = ECCO1_UNLIMITED_AIR;
    else
        session.unlimited_air = 0;

    session.scenario_key = "";
    session.stage_id = (session.stage_id & ~ECCO1_UNLIMITED_AIR) | session.unlimited_air;
    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;

    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
};

set_event_listener(instance, "ecco1_switch_air_on", 0, "click", ecco1_switch_air);
set_event_listener(instance, "ecco1_switch_air_off", 1, "click", ecco1_switch_air);

function ecco1_switch_charge(instance, value)
{
    let session = instance.ecco1_session;

    if (value == 1)
        session.charge_sonar = ECCO1_CHARGE_SONAR;
    else
        session.charge_sonar = 0;

    session.scenario_key = "";
    session.stage_id = (session.stage_id & ~ECCO1_CHARGE_SONAR) | session.charge_sonar;
    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;

    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
};

set_event_listener(instance, "ecco1_switch_charge_on", 0, "click", ecco1_switch_charge);
set_event_listener(instance, "ecco1_switch_charge_off", 1, "click", ecco1_switch_charge);

function ecco1_switch_kill(instance, value)
{
    let session = instance.ecco1_session;

    if (value == 1)
        session.perma_kill = ECCO1_PERMA_KILL;
    else
        session.perma_kill = 0;

    session.scenario_key = "";
    session.stage_id = (session.stage_id & ~ECCO1_PERMA_KILL) | session.perma_kill;
    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;

    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
};

set_event_listener(instance, "ecco1_switch_kill_on", 0, "click", ecco1_switch_kill);
set_event_listener(instance, "ecco1_switch_kill_off", 1, "click", ecco1_switch_kill);

function ecco_switch_debug_mode(instance, value)
{
    let session = instance.ecco1_session;

    session.debug_mode = 0;
    if (value == 1)
        session.debug_mode = 1;

    set_block_visibility("panel_debug_mode", session.debug_mode);
    update_ecco1_debug_mode(instance);
    switch_toggle("ecco_switch_debug_mode", session.debug_mode);
};

set_event_listener(instance, "ecco_switch_debug_mode_on", 0, "click", ecco_switch_debug_mode);
set_event_listener(instance, "ecco_switch_debug_mode_off", 1, "click", ecco_switch_debug_mode);

function ecco_switch_developer_mode(instance, value)
{
    let session = instance.ecco1_session;
    let developer_mode = 0;

    session.developer_mode = 0;
    if (value == 1)
        session.developer_mode = 1;

    update_ecco1_developer_mode(instance);
    switch_toggle("ecco_switch_developer_mode", session.developer_mode);
};

set_event_listener(instance, "ecco_switch_developer_mode_on", 0, "click", ecco_switch_developer_mode);
set_event_listener(instance, "ecco_switch_developer_mode_off", 1, "click", ecco_switch_developer_mode);

function ecco_switch_cheat_mode(instance, value)
{
    let session = instance.ecco1_session;
    let frames_per_second = 0;
 
    session.cheat_mode = 0;
    if (value == 1)
    {
        session.cheat_mode = 1;

        session.time_elapsed = 0;
        set_block_visibility("ecco1_block_time_elapsed", 0);
    }
    else 
    {
        session.cheat_mode = 0;

        session.time_elapsed = 64;
        set_block_visibility("ecco1_block_time_elapsed", 1);
    }

    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = 60;

    session.time_elapsed_total_seconds = session.time_elapsed/frames_per_second;
    session.time_elapsed_total_seconds = Math.trunc(session.time_elapsed_total_seconds); 

    document.getElementById("ecco_textin_time_elapsed_total_seconds").value = session.time_elapsed_total_seconds;
    document.getElementById("ecco_textin_time_elapsed").value = session.time_elapsed;

    update_ecco_time_elapsed(instance);

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;
 
    switch_toggle("ecco1_switch_cheat_mode", session.cheat_mode);
    update_ecco1_form(instance);
};

set_event_listener(instance, "ecco1_switch_cheat_mode_on", 0, "click", ecco_switch_cheat_mode);
set_event_listener(instance, "ecco1_switch_cheat_mode_off", 1, "click", ecco_switch_cheat_mode);



// END: ecco1_switch_*

set_event_listener(instance, "ecco1_textin_decoded_password", 0, "keyup", (value) =>
{
    let index = 0;

    let password = "";
    let raw_password = ""
    let password_suggestion = ""

    let password_record = null;
 
    let session = instance.ecco1_session;
    let frames_per_second = 0;

    raw_password = document.getElementById("ecco1_textin_decoded_password").value;
    raw_password = raw_password.toUpperCase();

    password = raw_password;

    // need to include no stage event

    if (password.length < 8)
        for (index = password.length; index < 8; index++)
            password+= " ";

    if (session.mode == ECCO1JP_MEGADRIVE)
    	password_record = ecco1jpmd_decrypt_password(password);
    else if (session.mode == ECCO1_SEGACD)
    	password_record = ecco1cd_decrypt_password(password);
    else
    	password_record = ecco1md_decrypt_password(password);

    password_suggestion = password.replace(/ /g, "-");
    password_suggestion = replace_char_at(password_suggestion, 7, password_record.checksum);

    session.stage_id = 0;
    session.password = raw_password;
    session.password_suggestion = password_suggestion;

    session.error_id = password_record.result;   

    if (password_record.result != 0) 
    {
        update_ecco1_form(instance);
        return;
    }

    session.unencrypted_data = password_record.unencrypted_data;
    session.stage_id = password_record.stage_id | password_record.flags;
    session.death_counter = password_record.death_counter;

    session.time_elapsed = password_record.time_elapsed << 6;

    table = get_ecco1_stage_id(-1, session.mode, 0)
    session.stage_index = get_table_index(session.stage_id & ECCO1_MASK_STAGEID, table);

    if (session.mode != ECCO1_SEGACD)
        if (session.stage_index == -1)
            session.stage_index = 1;
 
    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = 60;

    session.time_elapsed_total_seconds = session.time_elapsed/frames_per_second;
    session.time_elapsed_total_seconds = Math.trunc(session.time_elapsed_total_seconds); 

    document.getElementById("ecco_textin_time_elapsed_total_seconds").value = session.time_elapsed_total_seconds;
    document.getElementById("ecco_textin_time_elapsed").value = session.time_elapsed;
 
    session.stage_event = password_record.flags & ECCO1_STAGE_EVENT_MASK;
    session.globe_obtained = (session.stage_id & ECCO1_GLOBE_OBTAINED_MASK);
    session.unlimited_air = (session.stage_id & ECCO1_UNLIMITED_AIR);
    session.charge_sonar = (session.stage_id & ECCO1_CHARGE_SONAR);
    session.perma_kill = (session.stage_id & ECCO1_PERMA_KILL);

    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);

    update_ecco1_stage_attributes(instance);
    update_ecco_time_elapsed(instance);
    update_ecco1_form(instance);
});

set_event_listener(instance, "ecco2_textin_decoded_password", 0, "keyup", (value) =>
{
    let index = 0;

    let password = "";
    let raw_password = ""
    let password_suggestion = ""

    let password_record = null;

    let stage_name = "";
    let difficulty = "";

    let raw_string = "";
    let table = null;

    set_block_visibility("ecco2_block_decoder_difficulty_points", 0);
    set_block_visibility("ecco2_block_decoder_death_counter", 0);

    raw_password = document.getElementById("ecco2_textin_decoded_password").value;
    raw_password = raw_password.toUpperCase();

    password = raw_password;

    if (password.length < 8)
        for (index = password.length; index < 8; index++)
            password+= " ";

    password_record = ecco2_decrypt_password(password);

    password_suggestion = password.replace(/ /g, "-");
    password_suggestion = replace_char_at(password_suggestion, 3, password_record.checksum);
    
    document.getElementById("ecco2_label_decoder_error_id").innerHTML = password_record.error_id;
    document.getElementById("ecco2_label_password_suggestion").innerHTML = password_suggestion;

    if (password_record.error_id < 0) 
    {
        raw_string = "Invalid Password\n"
        raw_string+= "\n\n";
        raw_string+= password_record.password;
 
        text_generator_set_output(instance.text_generator, raw_string);
        instance.text_generator.config.THEME = THEME_DEFAULT; 

        return;
    }

    table = get_ecco2_table_stage_id(-1, 0);
    index = get_table_index(password_record.stage_id, table);

    table = get_ecco2_table_stage_name();

    if (index == -1)
        stage_name = "Invalid Stage";
    else
        stage_name = table[index];

    if (password_record.cheat_mode == 1)
    {
        difficulty = "Normal Difficulty";
        set_block_visibility("ecco2_block_decoder_difficulty_points", 1);
    }
    else if (password_record.forced_easy_mode == 1)
    {
        difficulty = "Forced Easy Mode";
        set_block_visibility("ecco2_block_decoder_death_counter", 1);
    }
    else if (password_record.forced_hard_mode == 1)
    {
        difficulty = "Forced Hard Mode";
        set_block_visibility("ecco2_block_decoder_death_counter", 1);
    }
    else
    {
        difficulty = "Normal Difficulty";
        set_block_visibility("ecco2_block_decoder_difficulty_points", 1);
    }

    document.getElementById("ecco2_label_decoder_unencrypted_data").innerHTML = password_record.unencrypted_data.toString(16).toUpperCase();
    document.getElementById("ecco2_label_decoder_stage_name").innerHTML = stage_name;
    document.getElementById("ecco2_label_decoder_stage_id").innerHTML = password_record.stage_id;
    document.getElementById("ecco2_label_decoder_globes_collected").innerHTML = password_record.globe_pairs;
    document.getElementById("ecco2_label_decoder_cheat_mode").innerHTML = password_record.cheat_mode;
    document.getElementById("ecco2_label_decoder_difficulty").innerHTML = difficulty;
    document.getElementById("ecco2_label_decoder_difficulty_points").innerHTML = Math.trunc(((0x1c - (password_record.difficulty_points - 3))/0x1c) * 100) + "%";
    document.getElementById("ecco2_label_decoder_death_counter").innerHTML = "Died " + password_record.difficulty_points + " Times!";
    document.getElementById("ecco2_label_decoder_time_elapsed").innerHTML = password_record.time_elapsed;

    if (password_record.stage_id == 63)
        stage_name = "The Secret\nPassword Is:"

    raw_string = stage_name + "\n"
    raw_string+= "\n\n";
    raw_string+= password_record.password;
 
    text_generator_set_output(instance.text_generator, raw_string);
    instance.text_generator.config.THEME = THEME_DEFAULT; 
});

let click_down = 0
let prevX = 0;
let posX = 0;
let startX = 0;

// start position has issues when cube is centered. need an origin.
document.getElementById("red_cube").addEventListener("mousedown", (e) =>
{
    if (click_down == 0)
    {
        click_down = 1;
        startX = document.getElementById("red_cube").getBoundingClientRect().left + 50;
        prevX = startX;
    }
});

window.addEventListener("mousemove", (e) =>
{
    let curPos = 0;

    if (click_down == 1)
    {
        curPos = e.clientX;

        if ((curPos < startX) && (posX <= 0))
        {
            prevX = startX;
            return;
        }

        posX = posX + (curPos - prevX);
        if (posX < 0) posX = 0;

        document.getElementById("red_cube").style.left = posX + "px";

        prevX = curPos;
    }
});

window.addEventListener("mouseup", (e) =>
{
    if (click_down == 1)
        click_down = 0;
});

document.getElementById("red_cube").addEventListener("touchstart", (e) =>
{
    if (click_down == 0)
    {
        click_down = 1;
        startX = document.getElementById("red_cube").getBoundingClientRect().left + 50;
        prevX = startX;
    }
});

document.getElementById("red_cube").addEventListener("touchmove", (e) =>
{
    let curPos = 0;

    if (click_down == 1)
    {
        curPos = e.touches[0].clientX;

        if ((curPos < startX) && (posX <= 0))
        {
            prevX = startX;
            return;
        }

        posX = posX + (curPos - prevX);
        if (posX < 0) posX = 0;

        document.getElementById("red_cube").style.left = posX + "px";

        prevX = curPos;
    }
});

document.getElementById("red_cube").addEventListener("touchend", (e) =>
{
    if (click_down == 1)
        click_down = 0;
});

function disable_all_panels()
{
    let table = [
        "panel_game",
        "panel_about",
        "panel_ecco1_scenarios",
        "panel_ecco1_stage",
        "panel_ecco1jpmd_stage",
        "panel_ecco1cd_stage",
        "panel_ecco1_stage_event",
        "panel_ecco1_globe_obtained",
        "panel_ecco1_death_counter",
        "panel_ecco1",
        "panel_ecco2"
    ];

    let index = 0;

    for (index = 0; index < table.length; index++)
        set_block_visibility(table[index], 0);
}

function get_ecco1_globe_icon_resource()
{
    let table = [
        ECCO1_GLOBE_OBTAINED_RED, "ecco1_globe_red",
        ECCO1_GLOBE_OBTAINED_BROWN, "ecco1_globe_brown",
        ECCO1_GLOBE_OBTAINED_PURPLE, "ecco1_globe_purple",
        ECCO1_GLOBE_OBTAINED_GREEN, "ecco1_globe_green", 
        ECCO1_GLOBE_OBTAINED_PURPLE5, "ecco1_globe_purple", 
        ECCO1_GLOBE_OBTAINED_PURPLE6, "ecco1_globe_purple",
        ECCO1_GLOBE_OBTAINED_PURPLE7, "ecco1_globe_purple"
    ];

    return table;
}

function ecco1_disable_globe_icons()
{

    let table = get_ecco1_globe_icon_resource();
    let index = 0;

    for (index = 0; index < table.length/2; index++)
        set_inline_visibility(table[(index * 2) + 1], 0); 
}

function ecco1_enable_globe_icon(globe_obtained)
{
    ecco1_disable_globe_icons();

    if (globe_obtained == 0)
        return;

    let id = get_table_value(
        globe_obtained, 
        get_ecco1_globe_icon_resource());

    ecco1_disable_globe_icons();
    set_inline_visibility(id, 1); 
}

function disable_spheres()
{
    let table = [
        "globe_jur_disabled",
        "globe_hom_disabled",
        "globe_vor_disabled",
        "globe_air_disabled",
        "globe_glo_disabled",
        "globe_cha_disabled",
        "globe_kil_disabled",

        "globe_jur_enabled",
        "globe_hom_enabled",
        "globe_vor_enabled",
        "globe_air_enabled",
        "globe_cha_enabled",
        "globe_kil_enabled",

        "globe_glo_red",
        "globe_glo_brown",
        "globe_glo_purple",
        "globe_glo_green",
        "globe_glo_purple5",
        "globe_glo_purple6",
        "globe_glo_purple7"
    ];

    let index = 0;

    for (index = 0; index < table.length; index++)
        set_inline_visibility(table[index], 0); 

    for (index = 0; index < 7; index++)
        set_inline_visibility(table[index], 1); 
}

function enable_spheres(flags)
{
    let stage_event = flags & ECCO1_STAGE_EVENT_MASK;
    let globe_obtained = flags & ECCO1_GLOBE_OBTAINED_MASK;
    let unlimited_air = flags & ECCO1_UNLIMITED_AIR;
    let charge_sonar = flags & ECCO1_CHARGE_SONAR;
    let perma_kill = flags & ECCO1_PERMA_KILL;

    disable_spheres();
     
    if (stage_event & ECCO1_TMACHINE_JURASSIC) 
    {
        set_inline_visibility("globe_jur_enabled", 1);
        set_inline_visibility("globe_jur_disabled", 0);
    }

    if (stage_event & ECCO1_TMACHINE_HOMEBAY)
    {
        set_inline_visibility("globe_hom_enabled", 1);
        set_inline_visibility("globe_hom_disabled", 0);
    }
 
    if (stage_event & ECCO1_STORM_VORTEX)
    {
        set_inline_visibility("globe_vor_enabled", 1);
        set_inline_visibility("globe_vor_disabled", 0);
    }

    switch(globe_obtained)
    {
        case ECCO1_GLOBE_OBTAINED_RED: 
        {
            set_inline_visibility("globe_glo_red", 1);
            set_inline_visibility("globe_glo_disabled", 0);

            break;
        }

        case ECCO1_GLOBE_OBTAINED_BROWN: 
        {
            set_inline_visibility("globe_glo_brown", 1);
            set_inline_visibility("globe_glo_disabled", 0);

            break;
        }

        case ECCO1_GLOBE_OBTAINED_PURPLE: 
        {
            set_inline_visibility("globe_glo_purple", 1);
            set_inline_visibility("globe_glo_disabled", 0);

            break;
        }

        case ECCO1_GLOBE_OBTAINED_GREEN: 
        {
            set_inline_visibility("globe_glo_green", 1);
            set_inline_visibility("globe_glo_disabled", 0);

            break;
        }

        case ECCO1_GLOBE_OBTAINED_PURPLE5: 
        {
            set_inline_visibility("globe_glo_purple5", 1);
            set_inline_visibility("globe_glo_disabled", 0);

            break;
        }

        case ECCO1_GLOBE_OBTAINED_PURPLE6: 
        {
            set_inline_visibility("globe_glo_purple6", 1);
            set_inline_visibility("globe_glo_disabled", 0);

            break;
        }

        case ECCO1_GLOBE_OBTAINED_PURPLE7: 
        {
            set_inline_visibility("globe_glo_purple7", 1);
            set_inline_visibility("globe_glo_disabled", 0);

            break;
        }
    }

    if (unlimited_air == ECCO1_UNLIMITED_AIR)
    {
        set_inline_visibility("globe_air_enabled", 1);
        set_inline_visibility("globe_air_disabled", 0);
    }

    if (charge_sonar == ECCO1_CHARGE_SONAR)
    {
        set_inline_visibility("globe_cha_enabled", 1);
        set_inline_visibility("globe_cha_disabled", 0);
    }

    if (perma_kill == ECCO1_PERMA_KILL)
    {
        set_inline_visibility("globe_kil_enabled", 1);
        set_inline_visibility("globe_kil_disabled", 0);
    }
}

menu_ecco_game_handler(instance, null, get_ecco_menu_ecco_game_resource())
