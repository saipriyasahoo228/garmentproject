
const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Dashboard',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'Configuration Module',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'CONFIGURATIONS',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Company Details',
              type: 'item',
              url: '/basic/Companydetails'
            },
            {
              id: 'badges',
              title: 'Category Details',
              type: 'item',
              url: '/basic/catagorymaster'
            },
            {
              id: 'breadcrumb',
              title: 'Item Details',
              type: 'item',
              url: '/basic/itemmaster'
            },
           
            {
              id: 'breadcrumb',
              title: 'Design Details',
              type: 'item',
              url: '/basic/designdetails'
            },
            {
              id: 'collapse',
              title: 'Party Details',
              type: 'item',
              url: '/basic/partydetails'
            },
            {
              id: 'tabs-pills',
              title: 'Tax Details',
              type: 'item',
              url: '/basic/taxdetails'
            },
            {
              id: 'typography',
              title: 'User Details',
              type: 'item',
              url: '/basic/userdetails'
            },
            {
              id: 'typography',
              title: 'Financial Year Details',
              type: 'item',
              url: '/basic/financialyeardetails'
            }
          ]
        }
      ]
    },
    {
      id: 'ui-forms',
      title: 'BARCODING & PURCHASE DETAILS',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'forms',
          title: 'Purchase Details',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/basic/purchasemaster'
        },
        {
          id: 'table',
          title: 'Stock Entry/Barcoding',
          type: 'item',
          icon: 'feather icon-server',
          url: '/basic/barcodedetails'
        }
      ]
    },
    {
      id: 'sales',
      title: 'Sales Module',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'sales',
          title: 'SALES',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Retail Sales',
              type: 'item',
              url: '/forms/Retailsales'
            },
            {
              id: 'badges',
              title: 'Bulk Sale',
              type: 'item',
              url: '/sale/Bulksale'
            },
            {
              id: 'breadcrumb',
              title: 'Bulk Sale Returns',
              type: 'item',
              url: '/sale/bulksalereturn'
            },
           
          ]
        }
      ]
    },
    
    {
      id: 'reports',
      title: 'REPORT SECTION',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'reports',
          title: 'REPORTS',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Sales Report',
              type: 'item',
              url: '/reports/salesreports'
            },
            {
              id: 'badges',
              title: 'Saletax Report',
              type: 'item',
              url: '/reports/salestaxreports'
            },
            {
              id: 'badges',
              title: 'Stock Report',
              type: 'item',
              url: '/reports/stockreport'
            },
            
            {
              id: 'breadcrumb',
              title: 'Discount Report',
              type: 'item',
              url: '/reports/discountreport'
            },
            {
              id: 'collapse',
              title: 'Customer Report',
              type: 'item',
              url: '/reports/customerreport'
            },
            {
              id: 'tabs-pills',
              title: 'Item Report',
              type: 'item',
              url: '/reports/itemwisereport'
            },
            {
              id: 'typography',
              title: 'Purchase Report',
              type: 'item',
              url: '/reports/purchasereport'
            },
            // {
            //   id: 'typography',
            //   title: 'Bulk Sale Report',
            //   type: 'item',
            //   url: '/reports/bulksalereport'
            // }
          ]
        }
      ]
    },
    
   
  ]
};

export default menuItems;
