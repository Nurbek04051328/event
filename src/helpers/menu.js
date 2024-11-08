export const links = [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/dashboardPage.vue'),
    meta: {
      title: 'Bosh sahifa'
    }
  },
  {
    path: 'categories',
    name: 'categories',
    component: () => import('@/views/dashboard/categories/indexCategories.vue'),
    meta: {
      title: 'Toifalar',
      toggle: true,
      toggleTitle: 'Yangi Toifa'
    },
  },
  {
    path: 'subcategories',
    name: 'subcategories',
    component: () => import('@/views/dashboard/subcategories/indexSubcategories.vue'),
    meta: {
      title: 'Ichki Toifalar',
      toggle: true,
      toggleTitle: 'Yangi Ichki Toifa'
    },
  },
  {
    path: 'tarif',
    name: 'Tarif',
    component: () => import('@/views/dashboard/subcategories/indexSubcategories.vue'),
    meta: {
      title: 'Ichki Toifalar',
      toggle: true,
      toggleTitle: 'Yangi Ichki Toifa'
    },
  },
  {
    path: 'activation-keys',
    name: 'activation-keys',
    component: () => import('@/views/dashboard/activations/indexActivations.vue'),
    meta: {
      title: 'Aktivation keylar',
      toggle: true,
      toggleTitle: 'Aktivation keylar'
    },
  },
  {
    path: 'news',
    name: 'news',
    component: () => import('@/views/dashboard/news/indexNews.vue'),
    meta: {
      title: 'Yangiliklar',
      toggle: true,
      toggleTitle: 'Yangilik'
    },
    children: []
  },
  {
    path: 'pages',
    name: 'pages',
    component: () => import('@/views/dashboard/pages/indexPages.vue'),
    meta: {
      title: 'Pages',
      toggle: true,
      toggleTitle: 'Yangi page'
    }
  },
  {
    path: 'documents',
    name: 'documents',
    component: () => import('@/views/dashboard/documents/indexDocument.vue'),
    meta: {
      title: 'Documentlar',
      toggle: true,
      toggleTitle: 'Yangi document'
    }
  },
  {
    path: 'reports',
    name: 'reports',
    component: () => import('@/views/dashboard/reports/indexReport.vue'),
    meta: {
      title: 'Reportlar',
      toggle: true,
      toggleTitle: 'Yangi report'
    }
  },
  {
    path: 'settings',
    name: 'settings',
    component: () => import('@/views/dashboard/settings/indexSettings.vue'),
    meta: {
      title: 'Sozlamalar'
    },
    children: [
      {
        path: 'country',
        name: 'country',
        component: () => import('@/views/dashboard/settings/countryList.vue'),
        meta: {
          title: 'Sozlamalar - Davlatlar',
          toggle: true,
          toggleTitle: 'Yangi davlat'
        }
      },
      {
        path: 'language',
        name: 'language',
        component: () => import('@/views/dashboard/settings/languageList.vue'),
        meta: {
          title: 'Sozlamalar - Tillar',
          toggle: true,
          toggleTitle: 'Yangi til'
        }
      },
      {
        path: 'region',
        name: 'region',
        component: () => import('@/views/dashboard/settings/regionList.vue'),
        meta: {
          title: 'Sozlamalar - Viloyat',
          toggle: true,
          toggleTitle: 'Yangi viloyat'
        }
      },
      {
        path: 'city',
        name: 'city',
        component: () => import('@/views/dashboard/settings/cityList.vue'),
        meta: {
          title: 'Sozlamalar - Shahar/tuman',
          toggle: true,
          toggleTitle: 'Yangi shahar/tuman'
        }
      },
      {
        path: 'school',
        name: 'school',
        component: () => import('@/views/dashboard/settings/schoolList.vue'),
        meta: {
          title: 'Sozlamalar - Maktablar',
          toggle: true,
          toggleTitle: 'Yangi maktab'
        }
      }
    ]
  },
]
