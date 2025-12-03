export const defaultAdminEventNotifierFields = [
    "id",
    "event_name",
    "template_id",
    "channel",
    "created_at",
    "updated_at",
    "deleted_at",
]

export const retrieveTransformQueryConfig = {
    defaults: defaultAdminEventNotifierFields,
    isList: false,
}

export const listTransformQueryConfig = {
    ...retrieveTransformQueryConfig,
    isList: true,
}
