function t_instance()
{
    this.event = null;

    this.version = 0;
    this.version_index = 0;

    this.ecco1_session = null;
    this.ecco2_session = null;
    this.text_generator = null;

    this.kepyad_alpha_index = 0;
    this.kepyad_alpha_handler = null;

    this.kepyad_numeric_index = 0;
    this.kepyad_numeric_handler = null;
}

function create_instance()
{
    let instance = new t_instance();

    instance.text_generator = create_text_generator();
    init_text_generator(instance.text_generator);

    instance.ecco1_session = new t_ecco1_session();
    instance.ecco2_session = new t_ecco2_session();

    ecco1_main(instance);
    // ecco2_main(instance);

    menu_ecco_game_handler(instance, null, get_ecco_table_game_menu());
    return instance;
}

// REMOVE!
let instance = create_instance();

// BEGIN GAME MENU

function update_ecco_time_elapsed(instance)
{
    let session = instance.ecco1_session;

    session.time_elapsed_hours = (session.time_elapsed_total_seconds/60/60);
    session.time_elapsed_minutes = (session.time_elapsed_total_seconds/60) % 60;
    session.time_elapsed_seconds = session.time_elapsed_total_seconds % 60;

    session.time_elapsed_hours = Math.trunc(session.time_elapsed_hours); 
    session.time_elapsed_minutes = Math.trunc(session.time_elapsed_minutes); 
    session.time_elapsed_seconds = Math.trunc(session.time_elapsed_seconds); 

    document.getElementById("ecco_textin_time_elapsed_hours").value = session.time_elapsed_hours;
    document.getElementById("ecco_textin_time_elapsed_minutes").value = session.time_elapsed_minutes;
    document.getElementById("ecco_textin_time_elapsed_seconds").value = session.time_elapsed_seconds;
    document.getElementById("ecco_textin_time_elapsed_total_seconds").value = session.time_elapsed_total_seconds;
    document.getElementById("ecco_textin_time_elapsed").value = session.time_elapsed;
}

function set_ecco_time_elapsed(instance, time_elapsed)
{
    let session = instance.ecco1_session;
    let frames_per_second = 0;

    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = GENESIS_NTSC_FPS;

    session.time_elapsed = time_elapsed;
    session.time_elapsed_total_seconds = session.time_elapsed/frames_per_second;
    session.time_elapsed_total_seconds = Math.round(session.time_elapsed_total_seconds); 

    update_ecco_time_elapsed(instance);
}

function get_ecco1md_defaults(instance)
{
    let session = instance.ecco1_session;

    instance.version = ECCO1_MEGADRIVE;
    session.mode = ECCO1_MEGADRIVE;

    session.debug_mode = 0;
    session.developer_mode = 1;

    set_block_visibility("block_ecco1md_goat", 1);
    set_block_visibility("dialog_scenarios", 1);

    switch_toggle("ecco_switch_debug_mode", session.debug_mode);
    switch_toggle("ecco_switch_developer_mode", session.developer_mode);

    set_ecco_time_elapsed(instance, ECCO1_RAWTIME_SECOND);
    update_ecco1_developer_mode(instance);

    menu_ecco1_stage_handler(instance, null, get_ecco1md_table_stage_menu())
    set_block_visibility("panel_ecco1", 1);
}

function get_ecco1jpmd_defaults(instance)
{
    let session = instance.ecco1_session;

    instance.version = ECCO1JP_MEGADRIVE;
    session.mode = ECCO1JP_MEGADRIVE;

    session.debug_mode = 0;
    session.developer_mode = 0;

    set_block_visibility("block_ecco1md_goat", 0);
    set_block_visibility("dialog_scenarios", 0);

    switch_toggle("ecco_switch_debug_mode", session.debug_mode);
    switch_toggle("ecco_switch_developer_mode", session.developer_mode);

    set_ecco_time_elapsed(instance, ECCO1_RAWTIME_SECOND);
    update_ecco1_developer_mode(instance);

    menu_ecco1_stage_handler(instance, null, get_ecco1jpmd_table_stage_menu())
    set_block_visibility("panel_ecco1", 1);
}

function get_ecco1cd_defaults(instance)
{
    let session = instance.ecco1_session;

    instance.version = ECCO1_SEGACD;
    session.mode = ECCO1_SEGACD;

    session.debug_mode = 0;
    session.developer_mode = 0;

    set_block_visibility("block_ecco1md_goat", 0);
    set_block_visibility("dialog_scenarios", 0);

    switch_toggle("ecco_switch_debug_mode", session.debug_mode);
    switch_toggle("ecco_switch_developer_mode", session.developer_mode);

    set_ecco_time_elapsed(instance, ECCO1_RAWTIME_SECOND);
    update_ecco1_developer_mode(instance);

    menu_ecco1_stage_handler(instance, null, get_ecco1cd_table_stage_menu())
    set_block_visibility("panel_ecco1", 1);
}

function get_ecco_table_game_menu()
{
    let table = [
        "menu_ecco_game_01",
        "menu_ecco_game_02",
        "menu_ecco_game_03",
        "menu_ecco_game_04",
        "menu_ecco_game_05",
        "menu_ecco_game_06",
        "menu_ecco_game_07",
    ];

    return table;
}

function get_ecco_table_game_name()
{
    let table = [
        -1,
        -2,
        "Ecco the Dolphin for Mega Drive/Genesis",
        "Ecco the Dolphin for the Nintendo Switch",
        "Ecco the Dolphin Japanese Version for Mega Drive",
        "Ecco the Dolphin Revision 1 Prototype for Sega Genesis",
        "Ecco the Dolphin for Mega CD/Sega CD"
    ];

    return table;
}

function get_ecco_table_game_version()
{
    let table = [
        -1,
        -2,
        ECCO1_MEGADRIVE,
        ECCO1_MEGADRIVE,
        ECCO1JP_MEGADRIVE,
        ECCO1JP_MEGADRIVE,
        ECCO1_SEGACD
    ];

    return table;
}

function menu_ecco_game_handler(instance, id, table)
{
    let session = instance.ecco1_session;
    let index = 0, version = 0;
    let game_name = "";

    if (id == null) id = "menu_ecco_game_03";
    index = get_table_index(id, table);

    version = get_table2_value(index, get_ecco_table_game_version());
    disable_all_panels();    

    switch (version)
    {
        case -1:
        {
            if (instance.version == ECCO2_MEGADRIVE)
                set_block_visibility("panel_ecco2", 1);
            else
                set_block_visibility("panel_ecco1", 1);

            return;
        }

        case -2:
        {
            set_block_visibility("panel_about", 1);
            return;
        }

        case ECCO1_MEGADRIVE:
        {
            get_ecco1md_defaults(instance);
            break;
        }

        case ECCO1JP_MEGADRIVE:
        {
            get_ecco1jpmd_defaults(instance);
            break;
        }

        case ECCO1_SEGACD:
        {
            get_ecco1cd_defaults(instance);
            break;
        }
    }

    instance.version = version;
    instance.version_index;

    session.mode = version;
    game_name = get_table2_value(index, get_ecco_table_game_name());

    document.getElementById("ecco_label_game").innerHTML = game_name;

    menu2_item_highlight(id, table);
}

// END GAME MENU

set_event_listener(instance, "ecco_textin_time_elapsed_hours", 0, "keyup", ecco_textin_time_elapsed_hms_handler);
set_event_listener(instance, "ecco_textin_time_elapsed_minutes", 0, "keyup", ecco_textin_time_elapsed_hms_handler);
set_event_listener(instance, "ecco_textin_time_elapsed_seconds", 0, "keyup", ecco_textin_time_elapsed_hms_handler);

set_event_listener(instance, "ecco_textin_time_elapsed_total_seconds", 0, "keyup", (value) =>
{
    let frames_per_second = 0;
    let session = instance.ecco1_session;

    frames_per_second = session.frames_per_second;
    if (session.frames_per_second == 0)
        frames_per_second = GENESIS_NTSC_FPS;

    session.time_elapsed_total_seconds = document.getElementById("ecco_textin_time_elapsed_total_seconds").value

    if (session.time_elapsed_total_seconds == "") return;
    if (isNaN(session.time_elapsed_total_seconds)) return;

    session.time_elapsed = session.time_elapsed_total_seconds * frames_per_second;
    session.time_elapsed = Math.trunc(session.time_elapsed);
    document.getElementById("ecco_textin_time_elapsed").value = session.time_elapsed;

    update_ecco_time_elapsed(instance);

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;
 
    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
});

set_event_listener(instance, "ecco_textin_time_elapsed", 0, "keyup", (value) =>
{
    let session = instance.ecco1_session;
    let time_elapsed = document.getElementById("ecco_textin_time_elapsed").value

    if (time_elapsed == "") return;
    if (isNaN(time_elapsed)) return;

    set_ecco_time_elapsed(instance, time_elapsed)
    update_ecco_time_elapsed(instance);

    session.password = ecco1_get_password(session)
    session.password_suggestion = session.password;
 
    session.stage_caption = get_ecco1_stage_caption(session.stage_index, session.mode);
    update_ecco1_form(instance);
});

// MOVE
function handler_show_panel(instance, id)
{
    disable_all_panels();
    set_block_visibility(id, 1);
}

