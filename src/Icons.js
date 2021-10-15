export const getIconUrl = (
  name, 
  darkModeOn, 
  {
    size = 40, 
    colors = { 
      dark: '38B6FF', 
      light: '000000' 
    }
  } = {}
) => {
  switch (name) {
    case 'prev':
      return `https://img.icons8.com/ios/${size}/${darkModeOn ? colors.dark : colors.light}/circled-chevron-left.png`;

    case 'home': 
      return `https://img.icons8.com/ios/${size}/${darkModeOn ? colors.dark : colors.light}/home-page.png`;

    case 'next':
      return `https://img.icons8.com/ios/${size}/${darkModeOn ? colors.dark : colors.light}/circled-chevron-right.png`;

    case 'blocked':
      return `https://img.icons8.com/material-outlined/${size}/${darkModeOn ? colors.dark : colors.light}/cancel-2.png`;

    case 'shrug':
      return `https://img.icons8.com/ios-glyphs/${size}/${darkModeOn ? colors.dark : colors.light}/shrug-emoticon.png`;

    case 'x': 
      return `https://img.icons8.com/fluency-systems-filled/${size}/${darkModeOn ? colors.dark : colors.light}/x.png`

    case 'asc':
      return `https://img.icons8.com/material-outlined/20/FFFFFF/generic-sorting-2.png`;

    case 'desc':
      return `https://img.icons8.com/material-outlined/20/FFFFFF/generic-sorting.png`;

    case 'eye': 
      return `https://img.icons8.com/material-outlined/${size}/${darkModeOn ? colors.dark : colors.light}/visible--v1.png`;

    case 'pencil': 
      return `https://img.icons8.com/material-outlined/${size}/${darkModeOn ? colors.dark : colors.light}/pencil--v1.png`;

    case 'tri-dot':
      return `https://img.icons8.com/ios-filled/${size}/${darkModeOn ? colors.dark : colors.light}/menu-2.png`;

    case 'trash':
      return `https://img.icons8.com/external-kiranshastry-solid-kiranshastry/${size}/${darkModeOn ? colors.dark : colors.light}/external-delete-multimedia-kiranshastry-solid-kiranshastry.png`;

    case 'parcel':
      return `https://img.icons8.com/ios-glyphs/${size}/${darkModeOn ? colors.dark : colors.light}/open-parcel.png`;

    case 'checkmark':
      return `https://img.icons8.com/ios-filled/${size}/${darkModeOn ? colors.dark : colors.light}/checkmark--v1.png`;

    case 'checkmark-box':
      return `https://img.icons8.com/external-bearicons-glyph-bearicons/${size}/${darkModeOn ? colors.dark : colors.light}/external-approved-approved-and-rejected-bearicons-glyph-bearicons-2.png`;
    
    case 'x-box':
      return `https://img.icons8.com/external-bearicons-glyph-bearicons/${size}/${darkModeOn ? colors.dark : colors.light}/external-reject-approved-and-rejected-bearicons-glyph-bearicons.png`;

    case 'x-circle':
      return `https://img.icons8.com/fluency-systems-filled/${size}/${darkModeOn ? colors.dark : colors.light}/xbox-x.png`;

    case 'magnifying-glass':
      return `https://img.icons8.com/material-outlined/${size}/${darkModeOn ? colors.dark : colors.light}/search--v1.png`;

    case 'plus':
      return `https://img.icons8.com/android/${size}/${darkModeOn ? colors.dark : colors.light}/plus.png`;

    case 'star-box':
      return `https://img.icons8.com/ios/${size}/${darkModeOn ? colors.dark : colors.light}/rating.png`;

    case 'sun':
      return `https://img.icons8.com/material-rounded/${size}/${darkModeOn ? colors.dark : colors.light}/sun--v1.png`;

    case 'moon':
      return `https://img.icons8.com/ios-filled/${size}/${darkModeOn ? colors.dark : colors.light}/crescent-moon.png`;

    case 'no-entry':
      return `https://img.icons8.com/ios/${size}/${darkModeOn ? colors.dark : colors.light}/no-entry.png`;

    case 'tri-stripe':
      return `https://img.icons8.com/material-outlined/24/${size}/${darkModeOn ? colors.dark : colors.light}/menu--v1.png`;

    case 'user-placeholder':
      return `https://img.icons8.com/ios-glyphs/${size}/${darkModeOn ? colors.dark : colors.light}/user--v1.png`;

    case 'sign-in':
      return `https://img.icons8.com/ios-filled/${size}/${darkModeOn ? colors.dark : colors.light}/login-rounded-right.png`;

    case 'sign-up':
      return `https://img.icons8.com/material-rounded/${size}/${darkModeOn ? colors.dark : colors.light}/edit-user-male.png`;

    case 'admin-emblem':
      return `https://img.icons8.com/ios-glyphs/${size}/${darkModeOn ? colors.dark : colors.light}/microsoft-admin--v2.png`;

    case 'pen-and-paper':
      return `https://img.icons8.com/material/${size}/${darkModeOn ? colors.dark : colors.light}/create-new--v1.png`;

    case 'letter-and-paper':
      return `https://img.icons8.com/external-flatart-icons-outline-flatarticons/${size}/${darkModeOn ? colors.dark : colors.light}/external-letter-contact-flatart-icons-outline-flatarticons.png`;

    default:
      break;
  }
}