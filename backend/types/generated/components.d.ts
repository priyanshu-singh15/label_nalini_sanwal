import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutCarousel extends Struct.ComponentSchema {
  collectionName: 'components_layout_carousels';
  info: {
    displayName: 'carousel';
  };
  attributes: {
    carousel_list: Schema.Attribute.Component<'layout.carousel-items', false>;
  };
}

export interface LayoutCarouselItems extends Struct.ComponentSchema {
  collectionName: 'components_layout_carousel_items';
  info: {
    displayName: 'carousel_items';
  };
  attributes: {
    carousel_item: Schema.Attribute.Component<'shared.media-with-link', true>;
  };
}

export interface LayoutCategory extends Struct.ComponentSchema {
  collectionName: 'components_layout_categories';
  info: {
    displayName: 'category';
  };
  attributes: {
    category_item: Schema.Attribute.Component<'shared.media-with-link', true>;
    heading: Schema.Attribute.String;
  };
}

export interface LayoutFeatured extends Struct.ComponentSchema {
  collectionName: 'components_layout_featureds';
  info: {
    displayName: 'featured';
  };
  attributes: {
    featured_item: Schema.Attribute.Component<'shared.media-with-link', true>;
    heading: Schema.Attribute.String;
  };
}

export interface LayoutFollowUs extends Struct.ComponentSchema {
  collectionName: 'components_layout_follow_uses';
  info: {
    displayName: 'Follow Us';
  };
  attributes: {
    label: Schema.Attribute.String;
    path: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    follow_us: Schema.Attribute.Component<'layout.follow-us', true>;
    quick_links: Schema.Attribute.Component<'layout.quick-links', true>;
    site_links: Schema.Attribute.Component<'layout.site-links', true>;
    visit_us: Schema.Attribute.Component<'layout.visit-us', false>;
  };
}

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

export interface LayoutQuickLinks extends Struct.ComponentSchema {
  collectionName: 'components_layout_quick_links';
  info: {
    displayName: 'Quick Links';
  };
  attributes: {
    label: Schema.Attribute.String;
    path: Schema.Attribute.String;
  };
}

export interface LayoutSiteLinks extends Struct.ComponentSchema {
  collectionName: 'components_layout_site_links';
  info: {
    displayName: 'Site Links';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'site_link'>;
    path: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
  };
}

export interface LayoutVisitUs extends Struct.ComponentSchema {
  collectionName: 'components_layout_visit_uses';
  info: {
    displayName: 'Visit Us';
  };
  attributes: {
    address: Schema.Attribute.Text;
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
    label: Schema.Attribute.String;
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
      'layout.carousel': LayoutCarousel;
      'layout.carousel-items': LayoutCarouselItems;
      'layout.category': LayoutCategory;
      'layout.featured': LayoutFeatured;
      'layout.follow-us': LayoutFollowUs;
      'layout.footer': LayoutFooter;
      'layout.logo': LayoutLogo;
      'layout.nav-bar': LayoutNavBar;
      'layout.nav-item': LayoutNavItem;
      'layout.nav-links': LayoutNavLinks;
      'layout.nav-lnk': LayoutNavLnk;
      'layout.quick-links': LayoutQuickLinks;
      'layout.site-links': LayoutSiteLinks;
      'layout.visit-us': LayoutVisitUs;
      'shared.media': SharedMedia;
      'shared.media-with-link': SharedMediaWithLink;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
