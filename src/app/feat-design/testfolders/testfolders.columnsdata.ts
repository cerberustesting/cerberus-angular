import { Column, COLUMN_TYPE, FILTER_MODE } from 'src/app/shared/model/front/column.model';

export const TestFoldersColumnsData: Column[] = [
    {
        displayName: 'Test Folder',
        apiName: 'test',
        contentName: 'test',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        filterable: true,
        filterDisplayed: false,
        multiple: true,
        placeholder: 'Select Test Folder',
        sSearch: [],
        filterMode: FILTER_MODE.DROPDOWN,
        type: COLUMN_TYPE.LONGTEXT
    },
    {
        displayName: 'Description',
        apiName: 'description',
        contentName: 'description',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        filterable: true,
        filterDisplayed: false,
        placeholder: 'Type Folder Description',
        sSearch: [],
        filterMode: FILTER_MODE.SEARCH_FIELD,
        type: COLUMN_TYPE.LONGTEXT,
        sortable: false
    },
    {
        displayName: 'Active',
        apiName: 'isActive',
        contentName: 'isActive',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        filterable: true,
        filterDisplayed: false,
        placeholder: 'Is the Test Active?',
        sSearch: [],
        filterMode: FILTER_MODE.SWITCH,
        type: COLUMN_TYPE.BOOLEAN,
        sortable: true
    },
    {
        displayName: 'Creation Date',
        apiName: 'tes.dateCreated',
        contentName: 'dateCreated',
        active: false,
        type: COLUMN_TYPE.LONGTEXT,
        flexGrow: 100,
        defaultActive: false,
        filterable: false,
        filterDisplayed: false,
        placeholder: 'Creation date',

    },
    {
        displayName: 'Created By',
        apiName: 'tes.usrCreated',
        contentName: 'usrCreated',
        active: false,
        type: COLUMN_TYPE.LONGTEXT,
        flexGrow: 100,
        defaultActive: false,
        filterable: false,
        filterDisplayed: false,
        placeholder: 'Latest modification date',

    },
    {
        displayName: 'Last Updated Date',
        apiName: 'tes.dateModif',
        contentName: 'dateModif',
        active: false,
        type: COLUMN_TYPE.LONGTEXT,
        flexGrow: 100,
        defaultActive: false,
        filterable: false,
        filterDisplayed: false,
        placeholder: 'Latest modification date',

    },
    {
        displayName: 'Last Updated By',
        apiName: 'tes.usrModif',
        contentName: 'usrModif',
        active: false,
        type: COLUMN_TYPE.LONGTEXT,
        flexGrow: 100,
        defaultActive: false,
        filterable: false,
        filterDisplayed: false,
        placeholder: 'Latest modification date',

    }
];
