export const defaultAdminNotificationTemplateFields = [
    "id",
    "name",
    "handle",
    "description",
    "template_code",
    "type",
    "layout_id",
    "created_at",
    "updated_at",
    "deleted_at",
]

export const retrieveTransformQueryConfig = {
    defaults: [
        ...defaultAdminNotificationTemplateFields,
        "layout.*",
    ],
    isList: false,
}

export const listTransformQueryConfig = {
    ...retrieveTransformQueryConfig,
    defaults: [
        ...defaultAdminNotificationTemplateFields,
        "layout.name",
    ],
    isList: true,
}
