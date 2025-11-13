import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutLogo extends Struct.ComponentSchema {
  collectionName: 'components_layout_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    path: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutNavBar extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_bars';
  info: {
    displayName: 'nav-bar';
  };
  attributes: {
    navLinks: Schema.Attribute.Component<'layout.nav-links', false>;
  };
}

export interface LayoutNavItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_items';
  info: {
    displayName: 'nav_item';
  };
  attributes: {
    label: Schema.Attribute.String;
    path: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
  };
}

export interface LayoutNavLinks extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_links';
  info: {
    displayName: 'nav-links';
  };
  attributes: {
    navLink: Schema.Attribute.Component<'layout.nav-lnk', true>;
  };
}

export interface LayoutNavLnk extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_lnks';
  info: {
    displayName: 'nav-lnk';
  };
  attributes: {
    label: Schema.Attribute.String;
    path: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedMediaWithLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_media_with_links';
  info: {
    displayName: 'media_with_link';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    path: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.logo': LayoutLogo;
      'layout.nav-bar': LayoutNavBar;
      'layout.nav-item': LayoutNavItem;
      'layout.nav-links': LayoutNavLinks;
      'layout.nav-lnk': LayoutNavLnk;
      'shared.media': SharedMedia;
      'shared.media-with-link': SharedMediaWithLink;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
