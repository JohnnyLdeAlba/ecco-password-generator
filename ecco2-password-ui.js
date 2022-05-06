function t_ecco2_session()
{
    this.mode = ECCO1_MEGADRIVE;

    this.ctrl_globe_pairs = null;
    this.ctrl_difficulty_percentage = null;
    this.ctrl_death_counter = null;

    this.difficulty_points = 0;
    this.difficulty_3dpoints = 0;
    this.difficulty_max = 0;

    this.difficulty = 0;
    this.difficulty_index = 0;

    this.globe_pairs = 24;
    this.globe_waveform = 8;
    this.globe_cycle = 2;

    this.stage_index = 0;
    this.stage_id = 0;

    this.death_counter = 0;

    this.cheat_mode = 0;

    this.password_decoded_index = 0;
    this.password_decoded = new Array();

    this.password_decoded[0] = '.';
    this.password_decoded[1] = '.';
    this.password_decoded[2] = '.';
    this.password_decoded[3] = '.';
    this.password_decoded[4] = '.';
    this.password_decoded[5] = '.';
    this.password_decoded[6] = '.';
    this.password_decoded[7] = '.';

    this.time_elapsed_index = 0;
    this.time_elapsed = new Array();

    this.time_elapsed[0] = 0;
    this.time_elapsed[1] = 0;
    this.time_elapsed[2] = 0;
    this.time_elapsed[3] = 0;
    this.time_elapsed[4] = 0;
    this.time_elapsed[5] = 0;

    this.time_elapsed_hours = 0;
    this.time_elapsed_minutes = 0;
    this.time_elapsed_seconds = 0;

    this.total_seconds_index = 0;
    this.total_seconds = new Array();
    this.total_seconds[0] = 0;

    this.total_seconds_index = 0;
    this.total_seconds = 0;

    this.total_frames_index = 0;
    this.total_frames = 0;

    this.frames_per_second = 0;

    this.password = "";
    this.password_suggestion = "";
    this.unencrypted_data = 0;

    this.debug_mode = 0;
    this.developer_mode = 1;

    this.error_id = 0;
}

function disable_all_ecco2_panels()
{
    let table = [
        "panel_game",
        "panel_about",
        "panel_keypad_alpha",
        "panel_keypad_numeric",
        "panel_ecco2",
        "panel_ecco2_stage",
        "panel_ecco2_difficulty"
    ];

    let index = 0;

    for (index = 0; index < table.length; index++)
        set_block_visibility(table[index], 0);
}

function handler_ecco2_show_panel(instance, id)
{
    disable_all_ecco2_panels();
    set_block_visibility(id, 1);
}

// BEGIN ECCO2 GAME MENU

function get_ecco2_defaults(instance)
{
    set_block_visibility("panel_ecco2", 1);

    set_ecco2_stage_id(instance, ECCO2_HOMEBAY);
    set_ecco2_difficulty(instance, ECCO2_DIFFICULTY_NORMAL);

    update_ecco2_display(instance);
}

function get_ecco2_table_game_menu()
{
    let table = [
        "menu_ecco2_game_01",
        "menu_ecco2_game_02",
        "menu_ecco2_game_03",
        "menu_ecco2_game_04",
        "menu_ecco2_game_05",
    ];

    return table;
}

function get_ecco2_table_game_name()
{
    let table = [
        -1,
        -2,
        "Ecco the Dolphin for Mega Drive/Genesis",
        "",
        "",
    ];

    return table;
}

function get_ecco2_table_game_version()
{
    let table = [
        -1,
        -2,
        ECCO2_MEGADRIVE,
        ECCO2_MEGADRIVE,
        ECCO2_MEGADRIVE
    ];

    return table;
}

function menu_ecco2_game_handler(instance, id, table)
{
    let session = instance.ecco1_session;
    let index = 0, version = 0;
    let game_name = "";

    if (id == null) id = "menu_ecco2_game_03";
    index = get_table_index(id, table);

    version = get_table2_value(index, get_ecco_table_game_version());
    disable_all_ecco2_panels();    

    switch (version)
    {
        case -1:
            set_block_visibility("panel_ecco2", 1);
            return;

        case -2:
            set_block_visibility("panel_about", 1);
            return;

        case ECCO2_MEGADRIVE:
            get_ecco2_defaults(instance);
            break;
    }

    instance.version = version;
    instance.version_index;

    session.mode = version;
    game_name = get_table2_value(index, get_ecco_table_game_name());

    document.getElementById("ecco2_label_game").innerHTML = game_name;
    menu2_item_highlight(id, table);
}


// END ECCO 2 GAME MENU
// BEGIN ECCO 2 GLOBE PAIRS

function set_ecco2_globe_pairs(instance, globe_pairs)
{
    let session = instance.ecco2_session;
    let pb = session.ctrl_globe_pairs;

    if (globe_pairs == -1)
        globe_pairs = pb.pointer_index;
    else pb.pointer_index = globe_pairs;

    session.globe_pairs = globe_pairs;

    document.getElementById("ecco2_label_globe_pairs").innerHTML = globe_pairs;
    pb_update(pb);
}

function handler_ecco2_globe_pairs(pb, event_id)
{
    if (event_id != PB_DROP && event_id != PB_HOVER) return;

    let pointer_tick = 0;

    pointer_tick = pb.pointer_index;
    if (event_id == PB_HOVER)
    {
        pointer_tick = pb_current_tick(pb, pb.pointer_x);
        document.getElementById("ecco2_label_globe_pairs").innerHTML = pointer_tick;
    }
    else
    {
        set_ecco2_globe_pairs(pb.instance, -1);
        update_ecco2_display(pb.instance);
    }
}

// END ECCO2 GLOBE PAIRS
// BEGIN ECCO 2 DIFFICULTY POINTS

const ECCO2_DIFFICULTY_POINTS_TOTAL = 13; // 29

let ECCO2_DIFFICULTY_POINTS_TABLE = [
    0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a,
    0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12,
    0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a,
    0x1b, 0x1c, 0x1d, 0x1e, 0x1f
];

function convert_difficulty_index(difficulty_index)
{
    return ECCO2_DIFFICULTY_POINTS_TABLE[difficulty_index];
}

function convert_difficulty_points(difficulty_points)
{
    let index = 0, last_index = 0, total = 0;;

    difficulty_points&= 0x7f;

    total = ECCO2_DIFFICULTY_POINTS_TOTAL;
    last_index = total-1;

    for (index = 0; index < total; index++)
        if (difficulty_points == ECCO2_DIFFICULTY_POINTS_TABLE[index])
            return last_index-index;

    return 0;
}

function increment_difficulty_points(difficulty_points)
{
    let x = 0;

    x = difficulty_points & 0x7f;

    // 3D STAGE
    if (difficulty_points & 0x80)
    {
        if (x < 0xf) x++;
        else return -1;

        difficulty_points&= 0x80;
        difficulty_points|= x;

        return difficulty_points;
    }

    if (x == 0x1f) return -1;

    if (x < 0x14) x++;
    if (x >= 0x4 && x < 0xa) x = 0xa;

    difficulty_points|= x;
    return difficulty_points;
}

function decrement_difficulty_points(difficulty_points)
{
    let x = 0;

    x = difficulty_points & 0x7f;
    if (x <= 0x3) return -1; 

    // 3D STAGE
    if (difficulty_points & 0x80)
    {
        if (x > 0x3) x--;

        difficulty_points&= 0x80;
        difficulty_points|= x;
 
        return difficulty_points;
    }

    x = x - (difficulty_points >>> 2);

    difficulty_points&= 0x80;
    difficulty_points|= x;

    return difficulty_points;
}

function calculate_table_difficulty_points(difficulty_points)
{
    let index = 0, x = 0, total = 0;
    let table = new Array();

    total = ECCO2_DIFFICULTY_POINTS_TOTAL;
    for (index = 0; index < total; index++)
        table[index] = 0;

    x = difficulty_points;
    while(x != -1)
    {
        x&= 0x7f;

        index = convert_difficulty_points(x);
        table[index] = x;

        if (difficulty_points & 0x80)
            x|= 0x80;

        x = increment_difficulty_points(x);
    }

    x = difficulty_points;
    while(x != -1)
    {
        x&= 0x7f;

        index = convert_difficulty_points(x);
        table[index] = x;

        if (difficulty_points & 0x80)
            x|= 0x80;

        x = decrement_difficulty_points(x);
    }

    return table;
}

function update_ecco2_difficulty_max(pb)
{
    let session = pb.instance.ecco2_session;
    let difficulty_points = 0;

    difficulty_points = session.difficulty_points & 0x7f;

    if (difficulty_points > 3)
    {
        session.difficulty_max = 0;
        switch_toggle("ecco2_switch_difficulty_max", 0);
        return;
    }

    session.difficulty_max = 1;
    switch_toggle("ecco2_switch_difficulty_max", 1);
}

function update_ecco2_difficulty_percentage(pb)
{
    let session = pb.instance.ecco2_session;

    let last_index = ECCO2_DIFFICULTY_POINTS_TOTAL-1;
    let percentage = 0;
        
    percentage = (pb.pointer_index/last_index)*100;
    percentage = Math.trunc(percentage);

    document.getElementById("ecco2_label_difficulty_percentage")
        .innerHTML = percentage + "%";

    update_ecco2_difficulty_max(pb);
}

function set_ecco2_difficulty_percentage(instance, difficulty_points)
{
    let session = instance.ecco2_session;
    let pb = session.ctrl_difficulty_percentage;

    let total = ECCO2_DIFFICULTY_POINTS_TOTAL;
    let last_index = total - 1;

    let index = 0;
    let table = null;

    if (difficulty_points == -1)
        session.difficulty_points = convert_difficulty_index(
            last_index - pb.pointer_index);
    else
    {
        pb.pointer_index = convert_difficulty_points(difficulty_points);
        session.difficulty_points = difficulty_points;
    }

    if (session.difficulty_3dpoints == 1)
        session.difficulty_points|= 0x80;
    else session.difficulty_points&= 0x7f;

    table = calculate_table_difficulty_points(
        session.difficulty_points);

    for (index = 0; index < total; index++)
        pb.r_tick_enabled[index] = 0;

    for (index = 0; index < total; index++)
        if (table[last_index - index] > 0)
            pb.r_tick_enabled[last_index - index] = 1;

    update_ecco2_difficulty_percentage(pb)
    pb_update(pb);
}

function handler_ecco2_difficulty_percentage(pb, event_id)
{
    if (event_id != PB_DROP && event_id != PB_HOVER) return;

    let session = pb.instance.ecco2_session;
    let last_index = ECCO2_DIFFICULTY_POINTS_TOTAL-1;

    if (event_id == PB_UPDATE || event_id == PB_HOVER)
    {
        if (event_id == PB_HOVER)
        {
            pb.pointer_index = pb_current_tick(pb, pb.pointer_x);
            session.difficulty_points = convert_difficulty_index(
                last_index - pb.pointer_index);
        }

        if (pb.pointer_index == -1)
            pb.pointer_index = 0;

        update_ecco2_difficulty_percentage(pb);
    }
    else if (event_id == PB_DROP)
    {
        set_ecco2_difficulty_percentage(pb.instance, -1);
        update_ecco2_display(instance);
   }
}

function ecco2_switch_difficulty_max(instance, value)
{
    let session = instance.ecco2_session;
    let difficulty_points = session.difficulty_points & 0x80;

    if (value == 1)
    {
        difficulty_points|= 3;
        session.difficulty_max = 1;
    }
    else
    {
        difficulty_points|= 4;
        session.difficulty_max = 0;
    }

    set_ecco2_difficulty_percentage(
        instance,
        difficulty_points);

    update_ecco2_display(instance);
}

function set_ecco2_3dpoints(instance, value)
{
    let session = instance.ecco2_session;

    if (value == 1)
    {
        session.difficulty_3dpoints = 1;
        session.difficulty_points|= 0x80;
    }
    else
    {
        session.difficulty_3dpoints = 0;
        session.difficulty_points&= 0x7f;
    }

    switch_toggle("ecco2_switch_3dpoints", value);
    set_ecco2_difficulty_percentage(instance, -1);
}

function ecco2_switch_3dpoints(instance, value)
{
    set_ecco2_3dpoints(instance, value); 
}

// END ECCO 2 DIFFICULTY POINTS
// BEGIN ECCO 2 DEATH COUNTER

function get_ecco2_table_death_counter_label()
{
    let table = [ 
        "No Deaths Playthrough!",
        "Died Once!",
        "Died Twice!",
        "Died Three Times!",
        "Died Four Times!",
        "Died Five Times!",
        "Died Six Times!",
        "Died Seven Times!",
        "Died Eight Times!",
        "Died Nine Times!",
        "Died Ten Times!",
        "Died Eleven Times!",
        "Died Twelve Times!",
        "Died Thirteen Times!",
        "Died Fourteen Times!",
        "So Many Times... I Forget How Many Times..."
    ];

    return table; 
}

function update_ecco2_death_counter(pb)
{
    let label = get_table2_value(
        pb.pointer_index, get_ecco2_table_death_counter_label());

    document.getElementById("ecco2_label_death_counter").innerHTML = label;
}

function set_ecco2_death_counter(instance, value)
{
    if (value > 15) value = 15;

    let session = instance.ecco2_session;
    let pb = session.ctrl_death_counter;

    if (value == -1) value = pb.pointer_index;
    else pb.pointer_index = value;

    session.death_counter = value;
    update_ecco2_death_counter(pb);
    pb_update(pb);
}

function handler_ecco2_death_counter(pb, event_id)
{
    let session = instance.ecco2_session;

    if (event_id == PB_HOVER)
    {
        pb.pointer_index = pb_current_tick(pb, pb.pointer_x);
        update_ecco2_death_counter(pb);
    }
    else if (event_id == PB_DROP || event_id == PB_UPDATE)
    {
        set_ecco2_death_counter(pb.instance, -1);
        update_ecco2_display(instance);
    }
}

// END ECCO 2 DEATH COUNTER
// BEGIN ECCO 2 CHEAT MODE

function set_ecco2_cheat_mode(instance, value)
{
    let session = instance.ecco2_session;

    if (value == -1)
        value = session.cheat_mode;
    else if (value == 1)
    {
        set_ecco2_difficulty(
            instance, ECCO2_CHEAT_MODE);
    }
    else
    {
        set_ecco2_difficulty(
            instance, ECCO2_DIFFICULTY_NORMAL);
    }

    session.cheat_mode = value;
    switch_toggle("ecco2_switch_cheat_mode", value);
}

function ecco2_switch_cheat_mode(instance, value)
{
    let session = instance.ecco2_session;

    set_ecco2_cheat_mode(instance, value);
    update_ecco2_display(instance);
}

// END ECCO 2 CHEAT MODE
// BEGIN ECCO 2 DIFFICULTY MENU

function get_ecco2_table_difficulty_menu()
{
    let table = [
        "menu_ecco2_difficulty_01",
        "menu_ecco2_difficulty_02",
        "menu_ecco2_difficulty_03",
        "menu_ecco2_difficulty_04",
        "menu_ecco2_difficulty_05"
    ];

    return table;
}

function get_ecco2_table_difficulty()
{
    let table = [
        -1,
        ECCO2_DIFFICULTY_NORMAL,
        ECCO2_DIFFICULTY_EASY,
        ECCO2_DIFFICULTY_HARD,
        ECCO2_CHEAT_MODE
    ];

    return table;
}

function get_ecco2_table_label()
{
    let table = [
        -1,
        "Normal Mode",
        "Easy Mode",
        "Hard Mode",
        "Cheat Mode"
    ];

    return table;
}

function set_ecco2_difficulty(instance, difficulty)
{
    let session = instance.ecco2_session;

    if (difficulty == -1)
    {
        difficulty = get_table2_value(
            session.difficulty_index, get_ecco2_table_difficulty());
    }
    else
    {
        session.difficulty_index = get_table_index(
            difficulty, get_ecco2_table_difficulty());
    }
    
    let menu_id = get_table2_value(
        session.difficulty_index, get_ecco2_table_difficulty_menu());
    let label = get_table2_value(
        session.difficulty_index, get_ecco2_table_label());

    session.difficulty = difficulty;

    if (difficulty == ECCO2_CHEAT_MODE)
        session.cheat_mode = 1;
    else session.cheat_mode = 0;;

    set_ecco2_cheat_mode(instance, -1);
    set_ecco2_3dpoints(instance, 0);
    set_ecco2_difficulty_percentage(instance, 15);
    set_ecco2_death_counter(instance, 0);

    if (difficulty == ECCO2_DIFFICULTY_NORMAL || difficulty == ECCO2_CHEAT_MODE)
    {
        set_block_visibility("ecco2_block_difficulty_normal", 1);
        set_block_visibility("ecco2_block_death_counter", 0);
    }
    else
    {
        set_block_visibility("ecco2_block_difficulty_normal", 0);
        set_block_visibility("ecco2_block_death_counter", 1);    
    }

    label = get_table2_value(session.difficulty_index, get_ecco2_table_label());
    document.getElementById("ecco2_label_difficulty").innerHTML = label;

    menu2_item_highlight(menu_id, get_ecco2_table_difficulty_menu());
}

function menu_ecco2_difficulty_handler(instance, id, table)
{
    let session = instance.ecco2_session;
    let version = instance.version;

    let index = get_table_index(id, table);
    if (index == -1)
    {
        disable_all_ecco2_panels();
        set_block_visibility("panel_ecco2", 1);
        return;
    }

    session.difficulty_index = index;
    set_ecco2_difficulty(instance, -1);

    disable_all_ecco2_panels();
    set_block_visibility("panel_ecco2", 1);
    update_ecco2_display(instance);
}

// END ECCO 2 DIFFICULTY MENU
// BEGIN ECCO 2 STAGE MENU

// MOVE!
function hide_all_blocks(table)
{
    let index = 0;
    for (index = 0; index < table.length; index++)
        if (typeof table[index] == "string")
            set_block_visibility(table[index], 0);
}

function set_ecco2_display(instance, stage_name, password)
{
    let output = stage_name;
    output+= "\n\n\n" + password;
 
    instance.text_generator.config.THEME = THEME_DEFAULT; 
    text_generator_set_output(instance.text_generator, output);
}

function update_ecco2_display(instance)
{
    let session = instance.ecco2_session;
    let points = session.difficulty_points;

    let stage_name = get_table2_value(
        session.stage_index, get_ecco2_table_stage_name());

    if (session.difficulty == ECCO2_DIFFICULTY_EASY ||
        session.difficulty == ECCO2_DIFFICULTY_HARD)
            points = session.death_counter;

    if (session.stage_id == ECCO2_SECRETPASSWORD)
        stage_name = "The Secret\nPassword Is:";

    let pr = ecco2_generate_password(
            session.stage_id,
            session.globe_pairs,
            session.difficulty,
	    points,
            session.time_elapsed);

    session.password = pr.password;
    session.password_suggestion = pr.password;

    document.getElementById("ecco2_label_password_suggestion").innerHTML = session.password_suggestion;
    set_ecco2_display(instance, stage_name, session.password); 
}

function get_ecco2_table_stage_menu()
{
    let table = [
        "menu_ecco2_stage_01",
        "menu_ecco2_stage_02",
        "menu_ecco2_stage_03",
        "menu_ecco2_stage_04",
        "menu_ecco2_stage_05",
        "menu_ecco2_stage_06",
        "menu_ecco2_stage_07",
        "menu_ecco2_stage_08",
        "menu_ecco2_stage_09",
        "menu_ecco2_stage_10",
        "menu_ecco2_stage_11",
        "menu_ecco2_stage_12",
        "menu_ecco2_stage_13",
        "menu_ecco2_stage_14",
        "menu_ecco2_stage_15",
        "menu_ecco2_stage_16",
        "menu_ecco2_stage_17",
        "menu_ecco2_stage_18",
        "menu_ecco2_stage_19",
        "menu_ecco2_stage_20",
        "menu_ecco2_stage_21",
        "menu_ecco2_stage_22",
        "menu_ecco2_stage_23",
        "menu_ecco2_stage_24",
        "menu_ecco2_stage_25",
        "menu_ecco2_stage_26",
        "menu_ecco2_stage_27",
        "menu_ecco2_stage_28",
        "menu_ecco2_stage_29",
        "menu_ecco2_stage_30",
        "menu_ecco2_stage_31",
        "menu_ecco2_stage_32",
        "menu_ecco2_stage_33",
        "menu_ecco2_stage_34",
        "menu_ecco2_stage_35",
        "menu_ecco2_stage_36",
        "menu_ecco2_stage_37",
        "menu_ecco2_stage_38",
        "menu_ecco2_stage_39",
        "menu_ecco2_stage_40",
        "menu_ecco2_stage_41",
        "menu_ecco2_stage_42",
        "menu_ecco2_stage_43",
        "menu_ecco2_stage_44",
        "menu_ecco2_stage_45",
        "menu_ecco2_stage_46",
        "menu_ecco2_stage_47",
        "menu_ecco2_stage_48"
    ];

    return table;
}

function get_ecco2_table_stage_id(flags)
{
    let index = 0;

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

function get_ecco2_table_stage_name()
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

function get_ecco2_table_stage_caption()
{
    let table = [
        -1,
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_trellias_bay",
        "ecco2_caption_trellias_bay",
        "ecco2_caption_sky_tides",
        "ecco2_caption_tube_of_medusa",
        "ecco2_caption_aqua_tubeway",
        "ecco2_caption_trellias_bay",
        "ecco2_caption_fin_to_feather",
        "ecco2_caption_trellias_bay",
        "ecco2_caption_trellias_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_dark_sea",
        "ecco2_caption_vortex_future",
        "ecco2_caption_vortex_future",
        "ecco2_caption_vortex_future",
        "ecco2_caption_globe_holder",
        "ecco2_caption_home_bay",
        "ecco2_caption_dark_sea",
        "ecco2_caption_home_bay",
        "ecco2_caption_vortex_queen",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_city_of_forever",
        "ecco2_caption_city_of_forever",
        "ecco2_caption_tmachine",
        "ecco2_caption_secret_password",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay",
        "ecco2_caption_home_bay"
    ];

    return table;
}

function set_ecco2_stage_id(instance, stage_id)
{
    let session = instance.ecco2_session;
    
    if (stage_id == -1)
    {
        stage_id = get_table2_value(
            session.stage_index,
            get_ecco2_table_stage_id(1));
    }
    else
    {
        session.stage_index = get_table_index(
            stage_id, get_ecco2_table_stage_id(1));
    }
   
    let stage_menu_id = get_table2_value(
        session.stage_index, get_ecco2_table_stage_menu());

    let stage_name = get_table2_value(
        session.stage_index, get_ecco2_table_stage_name());

    let stage_caption = get_table2_value(
        session.stage_index, get_ecco2_table_stage_caption());

    session.stage_id = stage_id;

    session.globe_pairs = ecco2_get_globe_audit(stage_id); 
    session.globe_pairs = ecco2_count_globe_pairs(session.globe_pairs, session.globe_pairs);

    set_ecco2_globe_pairs(instance, session.globe_pairs);
    hide_all_blocks(get_ecco2_table_stage_caption());
    set_block_visibility(stage_caption, 1);

    document.getElementById("ecco2_label_stage").innerHTML = stage_name;
    menu2_item_highlight(stage_menu_id, get_ecco2_table_stage_menu());
}

function menu_ecco2_stage_handler(instance, id, table)
{
    let session = instance.ecco2_session;
    let version = instance.version;
    let index = get_table_index(id, table);

    if (index == 0)
    {
        disable_all_panels();
        set_block_visibility("panel_ecco2", 1);
        return;
    }

    session.stage_index = index;
    set_ecco2_stage_id(instance, -1);

    disable_all_ecco2_panels();
    set_block_visibility("panel_ecco2", 1);
    update_ecco2_display(instance);
}

// END ECCO 2 STAGE MENU

function handler_ecco2_globe_waveform(pb, event_id)
{
    let session = pb.instance.ecco2_session;

    if (event_id != PB_HOVER && event_id != PB_DROP) return;

    let pointer_tick = 0;
    pointer_tick = pb.pointer_index;

    if (event_id == PB_HOVER)
        pointer_tick = pb_current_tick(pb, pb.pointer_x);

    session.globe_waveform = pb.pointer_index * 2;     
    document.getElementById("ecco2_label_globe_waveform").innerHTML = pointer_tick;
}

function handler_ecco2_globe_cycle(pb, event_id)
{
    let session = pb.instance.ecco2_session;

    if (event_id != PB_HOVER && event_id != PB_DROP) return;

    let pointer_tick = 0;
    pointer_tick = pb.pointer_index;

    if (event_id == PB_HOVER)
        pointer_tick = pb_current_tick(pb, pb.pointer_x);

    session.globe_cycle = pb.pointer_index * 2;     
    document.getElementById("ecco2_label_globe_cycle").innerHTML = pointer_tick;
}

// BEGIN NUMERIC KEYPAD

function get_ecco_table_keypad_numeric_menu()
{
    let table = [
        "control_number_00",
        "control_number_01",
        "control_number_02",
        "control_number_03",
        "control_number_04",
        "control_number_05",
        "control_number_06",
        "control_number_07",
        "control_number_08",
        "control_number_09",
        "control_number_10",
        "control_number_11"
    ];

    return table;
}

function get_ecco_table_keypad_numeric_value()
{
    let table = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
       -1,
       -2
    ];

    return table;
}

function menu_ecco_keypad_numeric_handler(instance, id, table)
{
    instance.keypad_numeric_index = get_table_index(id, table);
    if (instance.keypad_numeric_handler != null)
        instance.keypad_numeric_handler(instance, id, table); 
}

function get_ecco_table_keypad_alpha_menu()
{
    let table = [
        "control_alpha_00",
        "control_alpha_01",
        "control_alpha_02",
        "control_alpha_03",
        "control_alpha_04",
        "control_alpha_05",
        "control_alpha_06",
        "control_alpha_07",
        "control_alpha_08",
        "control_alpha_09",
        "control_alpha_10",
        "control_alpha_11",
        "control_alpha_12",
        "control_alpha_13",
        "control_alpha_14",
        "control_alpha_15",
        "control_alpha_16",
        "control_alpha_17",
        "control_alpha_18",
        "control_alpha_19",
        "control_alpha_20",
        "control_alpha_21",
        "control_alpha_22",
        "control_alpha_23",
        "control_alpha_24",
        "control_alpha_25",
        "control_alpha_26",
        "control_alpha_27",
        "control_alpha_28"
    ];

    return table;
}

function get_ecco_table_keypad_alpha_value()
{
    let table = [
       'A',
       'B',
       'C',
       'D',
       'E',
       'F',
       'G',
       'H',
       'I',
       'J',
       'K',
       'L',
       'M',
       'N',
       'O',
       'P',
       'Q',
       'R',
       'S',
       'T',
       'U',
       'V',
       'W',
       'X',
       'Y',
       'Z',
       ' ',
       -1,
       -2
    ];

    return table;
}

function menu_ecco_keypad_alpha_handler(instance, id, table)
{
    instance.keypad_alpha_index = get_table_index(id, table);
    if (instance.keypad_alpha_handler != null)
        instance.keypad_alpha_handler(instance, id, table); 
}

function pad(num, size)
{
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}  

function filter_null(output) { return output; }

function highlight_ecco2_password_decoded(instance)
{
    let session = instance.ecco2_session;
    let filter = new Array();
    let index = 0;

    for (index = 0; index < 8; index++)
    {
        filter[index] = filter_null;
        if (session.password_decoded_index == index)
            filter[index] = filter_font_highlight;
    }

    let output = ""

    output+= filter[0](session.password_decoded[0]);
    output+= filter[1](session.password_decoded[1]);
    output+= filter[2](session.password_decoded[2]);
    output+= filter[3](session.password_decoded[3]);
    output+= filter[4](session.password_decoded[4]);
    output+= filter[5](session.password_decoded[5]);
    output+= filter[6](session.password_decoded[6]);
    output+= filter[7](session.password_decoded[7]);

    return output;
}

function update_display_password_decoded(instance)
{
    let session = instance.ecco2_session;
    let output = "";

    output = "Decode A Password\n"
    output+= filter_font_white("\n");
    output+= highlight_ecco2_password_decoded(instance);
 
    text_generator_set_output(instance.text_generator, output);
    instance.text_generator.config.THEME = THEME_DEFAULT;; 
}

function menu_ecco2_password_decoded_handler(instance, id, table)
{
    let session = instance.ecco2_session;
    let version = instance.version;

    let index = 0, value = 0;

    value = get_table2_value(
       instance.keypad_alpha_index,
       get_ecco_table_keypad_alpha_value());

    if (value == -2)
    {
        disable_all_ecco2_panels();
        set_block_visibility("panel_ecco2", 1);

        update_ecco2_display(instance);
        return;
    }

    if (value == -1 && session.time_elapsed_index >= 0)
    {
        session.password_decoded[session.password_decoded_index] = " .";

        if (session.password_decoded_index > 0)
            session.password_decoded_index--;
    }
    else if (session.password_decoded_index <= 7)
    {
        session.password_decoded[session.password_decoded_index] = value;

        if (session.password_decoded_index < 7)
            session.password_decoded_index++;
    }

    let output = "";

    output+= session.password_decoded[0];
    output+= session.password_decoded[1];
    output+= session.password_decoded[2];
    output+= session.password_decoded[3];
    output+= session.password_decoded[4];
    output+= session.password_decoded[5];
    output+= session.password_decoded[6];
    output+= session.password_decoded[7];

    document.getElementById("ecco2_label_password_decoded").innerHTML = output + " &nbsp;&nbsp; ";
    update_display_password_decoded(instance);
}

function highlight_ecco2_time_elapsed(time_elapsed, time_elapsed_index)
{
    let filter = new Array();
    let index = 0;

    for (index = 0; index < 6; index++)
    {
        filter[index] = filter_null;
        if (time_elapsed_index == index)
            filter[index] = filter_font_highlight;
    }

    output = filter[5](time_elapsed[5]);
    output+= filter[4](time_elapsed[4])+"h ";
    output+= filter[3](time_elapsed[3]);
    output+= filter[2](time_elapsed[2])+"m ";
    output+= filter[1](time_elapsed[1]);
    output+= filter[0](time_elapsed[0])+"s";

    return output;
}

function update_display_time_elapsed(instance)
{
    let session = instance.ecco2_session;
    let output = "";

    output = "Time Elapsed\n"
    output+= filter_font_white("Hours : Minutes : Seconds\n");
    output+= highlight_ecco2_time_elapsed(
        session.time_elapsed, session.time_elapsed_index);
 
    text_generator_set_output(instance.text_generator, output);
    instance.text_generator.config.THEME = THEME_DEFAULT;; 
}

function menu_ecco2_time_elapsed_handler(instance, id, table)
{
    let session = instance.ecco2_session;
    let version = instance.version;

    let index = 0, value = 0;

    value = get_table2_value(
       instance.keypad_numeric_index,
       get_ecco_table_keypad_numeric_value());

    if (value == -2)
    {
        disable_all_ecco2_panels();
        set_block_visibility("panel_ecco2", 1);

        update_ecco2_display(instance);
        return;
    }

    if (value == -1 && session.time_elapsed_index >= 0)
    {
        session.time_elapsed[session.time_elapsed_index] = 0;

        if (session.time_elapsed_index > 0)
            session.time_elapsed_index--;
    }
    else if (value > -1 && session.time_elapsed_index <= 5)
    {
        session.time_elapsed[session.time_elapsed_index] = value;

        if (session.time_elapsed_index < 5)
            session.time_elapsed_index++;
    }

    session.time_elapsed_hours = session.time_elapsed[5] * 10; 
    session.time_elapsed_hours+= session.time_elapsed[4]; 
    session.time_elapsed_minutes = session.time_elapsed[3] * 10; 
    session.time_elapsed_minutes+= session.time_elapsed[2]; 
    session.time_elapsed_seconds = session.time_elapsed[1] * 10; 
    session.time_elapsed_seconds+= session.time_elapsed[0]; 

    document.getElementById("ecco2_label_time_elapsed").innerHTML = 
        pad(session.time_elapsed_hours, 2)+"h "+
        pad(session.time_elapsed_minutes, 2)+"m "+
        pad(session.time_elapsed_seconds, 2)+"s &nbsp;&nbsp; ";

    update_display_time_elapsed(instance);
}

function update_display_total_seconds(instance)
{
    let session = instance.ecco2_session;
    let output = "";

    output = "Total Seconds\n"
    output+= filter_font_white("1 hour: 3600 seconds\n1 minute: 60 seconds\n");
    output+= "\n";

    output+= session.total_seconds;
 
    text_generator_set_output(instance.text_generator, output);
    instance.text_generator.config.THEME = THEME_DEFAULT;; 
}

function menu_ecco2_total_seconds_handler(instance, id, table)
{
    let session = instance.ecco2_session;
    let version = instance.version;

    let index = 0, value = 0;

    value = get_table2_value(
       instance.keypad_numeric_index,
       get_ecco_table_keypad_numeric_value());

    if (value == -2)
    {
        disable_all_ecco2_panels();
        set_block_visibility("panel_ecco2", 1);

        update_ecco2_display(instance);
        return;
    }

    if (value == -1 && session.total_seconds_index >= 0)
    {
        session.total_seconds = 0;
        session.total_seconds_index = 0;
    }
    else if (value > -1 && session.total_seconds_index <= 5)
    {
        session.total_seconds = (10 * session.total_seconds) + value;

        if (session.total_seconds_index < 5)
            session.total_seconds_index++;
    }

    let output = "";
    output+= session.total_seconds + " Seconds &nbsp;&nbsp; "; 

    document.getElementById("ecco2_label_total_seconds").innerHTML = output;

    update_display_total_seconds(instance);
}

function update_display_total_frames(instance)
{
    let session = instance.ecco2_session;
    let output = "";

    output = "Total Frames\n"
    output+= "\n";

    output+= session.total_frames;
 
    text_generator_set_output(instance.text_generator, output);
    instance.text_generator.config.THEME = THEME_DEFAULT;; 
}

function menu_ecco2_total_frames_handler(instance, id, table)
{
    let session = instance.ecco2_session;
    let version = instance.version;

    let index = 0, value = 0;

    value = get_table2_value(
       instance.keypad_numeric_index,
       get_ecco_table_keypad_numeric_value());

    if (value == -2)
    {
        disable_all_ecco2_panels();
        set_block_visibility("panel_ecco2", 1);

        update_ecco2_display(instance);
        return;
    }

    if (value == -1 && session.total_frames_index >= 0)
    {
        session.total_frames = 0;
        session.total_frames_index = 0;
    }
    else if (value > -1 && session.total_frames_index <= 5)
    {
        session.total_frames = (10 * session.total_frames) + value;

        if (session.total_frames_index < 5)
            session.total_frames_index++;
    }

    let output = "";
    output+= session.total_frames + " Frames &nbsp;&nbsp; "; 

    document.getElementById("ecco2_label_total_frames").innerHTML = output;

    update_display_total_frames(instance);
}

function ecco2_control_password_decoded(instance, value)
{
    instance.keypad_alpha_handler = menu_ecco2_password_decoded_handler;

    disable_all_ecoo2_panels();

    update_display_password_decoded(instance);
    set_block_visibility("panel_keypad_alpha", 1);
}

function ecco2_control_time_elapsed(instance, value)
{
    instance.keypad_numeric_handler = menu_ecco2_time_elapsed_handler;

    disable_all_ecco2_panels();

    update_display_time_elapsed(instance);
    set_block_visibility("panel_keypad_numeric", 1);
}

function ecco2_control_total_seconds(instance, value)
{
    instance.keypad_numeric_handler = menu_ecco2_total_seconds_handler;

    disable_all_ecco2_panels();

    update_display_total_seconds(instance);
    set_block_visibility("panel_keypad_numeric", 1);
}

function ecco2_control_total_frames(instance, value)
{
    instance.keypad_numeric_handler = menu_ecco2_total_frames_handler;

    disable_all_ecco2_panels();

    update_display_total_frames(instance);
    set_block_visibility("panel_keypad_numeric", 1);
}

function ecco2_main(instance)
{
    let session = instance.ecco2_session; 

    session.ctrl_globe_pairs = create_progressbar(
        "ecco2_control_globe_pairs", 25);

    session.ctrl_globe_pairs.instance = instance;
    session.ctrl_globe_pairs.handler = handler_ecco2_globe_pairs;

    session.ctrl_difficulty_percentage = create_progressbar(
        "ecco2_control_difficulty_percentage", 13);

    session.ctrl_difficulty_percentage.instance = instance;
    session.ctrl_difficulty_percentage.handler = handler_ecco2_difficulty_percentage;

    session.ctrl_death_counter = create_progressbar(
        "ecco2_control_death_counter", 16);

    session.ctrl_death_counter.instance = instance;;
    session.ctrl_death_counter.handler = handler_ecco2_death_counter;

    session.ctrl_globe_waveform = create_progressbar(
        "ecco2_control_globe_waveform", 64);

    session.ctrl_globe_waveform.instance = instance;
    session.ctrl_globe_waveform.handler = handler_ecco2_globe_waveform;
    session.ctrl_globe_waveform.tick_hidden = 1;

    session.ctrl_globe_cycle = create_progressbar(
        "ecco2_control_globe_cycle",64);

    session.ctrl_globe_cycle.instance = instance;
    session.ctrl_globe_cycle.handler = handler_ecco2_globe_cycle;
    session.ctrl_globe_cycle.tick_hidden = 1;

    enable_menu2(instance, get_ecco2_table_game_menu(), menu_ecco2_game_handler);
    enable_menu2(instance, get_ecco2_table_stage_menu(), menu_ecco2_stage_handler);
    enable_menu2(instance, get_ecco2_table_difficulty_menu(), menu_ecco2_difficulty_handler);

    enable_menu2(instance, get_ecco_table_keypad_alpha_menu(), menu_ecco_keypad_alpha_handler);
    enable_menu2(instance, get_ecco_table_keypad_numeric_menu(), menu_ecco_keypad_numeric_handler);

    set_event_listener(instance, "ecco2_control_game", "panel_game", "click", handler_ecco2_show_panel);
    set_event_listener(instance, "ecco2_control_stage", "panel_ecco2_stage", "click", handler_ecco2_show_panel);
    set_event_listener(instance, "ecco2_control_difficulty", "panel_ecco2_difficulty", "click", handler_ecco2_show_panel);

    set_event_listener(instance, "ecco2_control_password_decoded", 0, "click", ecco2_control_password_decoded);
    set_event_listener(instance, "ecco2_control_time_elapsed", 0, "click", ecco2_control_time_elapsed);
    set_event_listener(instance, "ecco2_control_total_seconds", 0, "click", ecco2_control_total_seconds);
    set_event_listener(instance, "ecco2_control_total_frames", 0, "click", ecco2_control_total_frames);

    set_event_listener(instance, "ecco2_switch_difficulty_max_on", 0, "click", ecco2_switch_difficulty_max);
    set_event_listener(instance, "ecco2_switch_difficulty_max_off", 1, "click", ecco2_switch_difficulty_max);
    set_event_listener(instance, "ecco2_switch_3dpoints_on", 0, "click", ecco2_switch_3dpoints);
    set_event_listener(instance, "ecco2_switch_3dpoints_off", 1, "click", ecco2_switch_3dpoints);
    set_event_listener(instance, "ecco2_switch_cheat_mode_on", 0, "click", ecco2_switch_cheat_mode);
    set_event_listener(instance, "ecco2_switch_cheat_mode_off", 1, "click", ecco2_switch_cheat_mode);
}


