import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicAssetLoaderService {
  loadScript(url: string) {
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  }

  loadStyle(url: string) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }
  loadInlineScript(code: string) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = code;
    document.body.appendChild(script);
  }

  loadAdminAssets() {
    // css

    this.loadStyle(
      'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback'
    );

    this.loadStyle('assets/admin/plugins/fontawesome-free/css/all.min.css');
    this.loadStyle(
      'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
    );

    this.loadStyle(
      'assets/admin/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
    );

    this.loadStyle(
      'assets/admin/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
    );
    this.loadStyle('assets/admin/plugins/jqvmap/jqvmap.min.css');
    this.loadStyle('assets/admin/dist/css/adminlte.min.css');
    this.loadStyle(
      'assets/admin/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
    );
    this.loadStyle('assets/admin/plugins/daterangepicker/daterangepicker.css');

    this.loadStyle('assets/admin/plugins/summernote/summernote-bs4.min.css');

    // scripts

    this.loadScript('assets/admin/plugins/jquery/jquery.min.js');
    this.loadScript('assets/admin/plugins/jquery-ui/jquery-ui.min.js');
    this.loadInlineScript("$.widget.bridge('uibutton', $.ui.button);"); // Inline script to bridge uibutton

    this.loadScript(
      'assets/admin/plugins/bootstrap/js/bootstrap.bundle.min.js'
    );
    this.loadScript('assets/admin/plugins/chart.js/Chart.min.js');

    this.loadScript('assets/admin/plugins/sparklines/sparkline.js');
    this.loadScript('assets/admin/plugins/jqvmap/jquery.vmap.min.js');
    this.loadScript('assets/admin/plugins/jqvmap/maps/jquery.vmap.usa.js');
    this.loadScript('assets/admin/plugins/jquery-knob/jquery.knob.min.js');
    this.loadScript('assets/admin/plugins/moment/moment.min.js');
    this.loadScript('assets/admin/plugins/daterangepicker/daterangepicker.js');
    this.loadScript(
      'assets/admin/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js'
    );
    this.loadScript('assets/admin/plugins/summernote/summernote-bs4.min.js');
    this.loadScript(
      'assets/admin/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'
    );
    this.loadScript('assets/admin/dist/js/adminlte.js');
    this.loadScript('assets/admin/dist/js/demo.js');

    this.loadScript('assets/admin/dist/js/pages/dashboard.js');
  }

  loadUserAssets() {
    this.loadStyle('assets/user/css/user-style.css');
    this.loadScript('assets/user/js/user-script.js');
  }
}
