import { createPalette, standardColorAdjustment } from '../../utils/create-color-palette'

import defaultVariables from './default-theme-variables'

export default {
  semantic: {
    // OneCX semantic variables extension
    extend: {
      ...defaultVariables.font,
      ...defaultVariables.topbar,
      ...defaultVariables.sidebar,
      ...defaultVariables.general,
      errorColor: '#b00020',
      animationDuration: '0.2s',
    },
    transitionDuration: '0.2s',
    focusRing: {
      width: '1px',
      style: 'solid',
      color: '{primary.color}',
      offset: '2px',
      shadow: 'none',
    },
    disabledOpacity: '0.6',
    iconSize: '1rem',
    anchorGutter: '2px',
    primary: {
      ...createPalette(defaultVariables.general.primaryColor, standardColorAdjustment),
    },
    formField: {
      paddingX: '0.75rem',
      paddingY: '0.75rem',
      sm: {
        fontSize: '0.875rem',
        paddingX: '0.625rem',
        paddingY: '0.625rem',
      },
      lg: {
        fontSize: '1.125rem',
        paddingX: '0.875rem',
        paddingY: '0.875rem',
      },
      borderRadius: '{border.radius.md}',
      focusRing: {
        width: '0',
        style: 'none',
        color: 'transparent',
        offset: '0',
        shadow: 'none',
      },
      transitionDuration: '{transition.duration}',
    },
    list: {
      padding: '0',
      gap: '2px',
      header: {
        padding: '0.75rem',
      },
      option: {
        padding: '0.75rem 0.75rem',
        borderRadius: 0,
      },
      optionGroup: {
        padding: '0.75rem',
        fontWeight: '600',
      },
    },
    mask: {
      transitionDuration: '0.15s',
    },
    content: {
      borderRadius: '{border.radius.md}',
    },
    navigation: {
      list: {
        padding: '0.5rem 1.25rem',
        gap: '2px',
      },
      item: {
        padding: '0.75rem 0.75rem',
        borderRadius: '0',
        gap: '0.5rem',
      },
      submenuLabel: {
        padding: '0.75rem',
        fontWeight: '400',
      },
      submenuIcon: {
        size: '0.875rem',
      },
    },
    overlay: {
      select: {
        borderRadius: '{border.radius.sm}',
        shadow:
          '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)',
      },
      popover: {
        borderRadius: '{border.radius.sm}',
        padding: '0.75rem',
        shadow:
          '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)',
      },
      modal: {
        borderRadius: '{border.radius.sm}',
        padding: '1.25rem',
        shadow:
          '0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)',
      },
      navigation: {
        shadow: '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)',
      },
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f7f8f9',
          100: '#dadee3',
          200: '#bcc3cd',
          300: '#9fa9b7',
          400: '#818ea1',
          500: '#64748b',
          600: '#556376',
          700: '#465161',
          800: '#37404c',
          900: '#282e38',
          950: '#191d23',
        },
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{general.button.hover.bg}',
          activeColor: '{general.button.active.bg}',
        },
        highlight: {
          background: '{primary.100}',
          focusBackground: '{primary.200}',
          color: '{primary.color}',
          focusColor: '{text.color}',
        },
        mask: {
          background: 'rgba(0, 0, 0, 0.32)',
          color: '{surface.200}',
        },
        formField: {
          focusBorderColor: '{primary.color}',
          invalidBorderColor: '{error.color}',
          invalidPlaceholderColor: '{error.color}',
          background: '{surface.0}',
          filledBackground: '{surface.50}',
          filledHoverBackground: '{surface.50}',
          filledFocusBackground: '{surface.50}',
          disabledBackground: '{surface.100}',
          disabledColor: '{surface.400}',
          borderColor: '{surface.200}',
          hoverBorderColor: '{surface.400}',
          color: '{surface.700}',
          placeholderColor: '{surface.500}',
          iconColor: '{surface.400}',
          shadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)',
          floatLabelColor: '{surface.500}',
          floatLabelFocusColor: '{primary.color}',
          floatLabelActiveColor: '{surface.500}',
          floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
        },
        text: {
          color: '{general.text.color}',
          hoverColor: '{general.text.secondary.color}',
          mutedColor: '{surface.500}',
          hoverMutedColor: '{surface.600}',
        },
        content: {
          background: '{general.content.bg.color}',
          hoverBackground: '{general.hover.bg.color}',
          borderColor: '{surface.200}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
        overlay: {
          select: {
            background: '{surface.0}',
            borderColor: '{surface.200}',
            color: '{text.color}',
          },
          popover: {
            background: '{surface.0}',
            borderColor: '{surface.200}',
            color: '{text.color}',
          },
          modal: {
            background: '{surface.0}',
            borderColor: '{surface.200}',
            color: '{text.color}',
          },
        },
        list: {
          option: {
            option: {
              selectedColor: '{primary.color}',
              selectedFocusColor: '{primary.color}',
            },
            focusBackground: '{surface.100}',
            selectedBackground: '{highlight.background}',
            selectedFocusBackground: '{highlight.focus.background}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            selectedColor: '{highlight.color}',
            selectedFocusColor: '{highlight.focus.color}',
            icon: {
              color: '{surface.400}',
              focusColor: '{surface.500}',
            },
          },
          optionGroup: {
            background: '{surface.0}',
            color: '{text.muted.color}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.100}',
            activeBackground: '{surface.100}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            activeColor: '{text.hover.color}',
            icon: {
              color: '{surface.400}',
              focusColor: '{surface.500}',
              activeColor: '{surface.500}',
            },
          },
          submenuLabel: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
          submenuIcon: {
            color: '{surface.400}',
            focusColor: '{surface.500}',
            activeColor: '{surface.500}',
          },
        },
      },
    },
  },
}
