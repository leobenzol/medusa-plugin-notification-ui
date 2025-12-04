export const BLANK_LAYOUT_JSX = `<Html>
  <Head />
  <Preview>{previewText || "Email Preview"}</Preview>
  <Body>
    {children}
  </Body>
</Html>`

export const BLANK_LAYOUT_ADDITIONAL = ``

export const BLANK_LAYOUT_PREVIEW_PROPS = `
  previewText: "This is a blank layout",
  children: null,
`

export const BLANK_LAYOUT_I18N = ``

export const BLANK_LAYOUT = {
  jsx: BLANK_LAYOUT_JSX,
  additional: BLANK_LAYOUT_ADDITIONAL,
  preview_props: BLANK_LAYOUT_PREVIEW_PROPS,
  i18n: BLANK_LAYOUT_I18N,
}
