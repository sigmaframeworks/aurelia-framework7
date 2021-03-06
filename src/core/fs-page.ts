// FS Page
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016 Sigma Frameworks
// @license     : MIT

import {customElement, containerless, inlineView, useView, bindable} from "aurelia-framework";
import {FSConstants, FSEvent} from "../sigma-ui-frameseven";

@customElement('fs-page')
@inlineView('<template data-page.bind="dataPage" class="page block"><slot></slot></template>')
export class FSPage {
  @bindable()
  dataPage = '';

  constants = FSConstants;
  framework7 = window.framework7;

  constructor(public element: Element) {
  }

  unbind() {
    FSEvent.fireEvent('unbind', this.element);
  }
  detached() {
    FSEvent.fireEvent('detached', this.element);
  }

  attached() {
    FSEvent.queueTask(() => {
      Dom7(`[data-page="${this.dataPage}"] a.external`).click(a => { if (a.target.dataset.url) window.open(a.target.dataset.url, '_system', 'location=yes'); });
      if (this.element.querySelector('fs-navbar')) this.element.classList.add('navbar-fixed');
      if (this.element.querySelector('fs-toolbar')) this.element.classList.add('toolbar-through');
      setTimeout(() => {
        framework7.initSmartSelects(this.element);
        framework7.initImagesLazyLoad(this.element);
      }, 500);
    });
  }
}

@customElement('fs-popup')
@inlineView('<template class="popup page view block"><slot></slot></template>')
export class FSPopup {
  @bindable()
  dataPage = '';

  constants = FSConstants;
  framework7 = window.framework7;

  constructor(public element: Element) {
    Dom7(this.element).on('close', () => {
      this.element.au.controller.unbind();
      this.element.au.controller.detached();
    });
  }

  unbind() {
    FSEvent.fireEvent('unbind', this.element);
  }
  detached() {
    FSEvent.fireEvent('detached', this.element);
  }

  attached() {
    FSEvent.queueTask(() => {
      Dom7(`[data-page="${this.dataPage}"] a.external`).click(a => { if (a.target.dataset.url) window.open(a.target.dataset.url, '_system', 'location=yes'); });
      if (this.element.querySelector('fs-navbar')) this.element.classList.add('navbar-fixed');
      if (this.element.querySelector('fs-toolbar')) this.element.classList.add('toolbar-through');
      framework7.popup(this.element, true);
      setTimeout(() => {
        framework7.initSmartSelects(this.element);
        framework7.initImagesLazyLoad(this.element);
      }, 500);
    });
  }

  close() {
    framework7.closeModal(this.element);
    setTimeout(() => {
      this.unbind();
      this.detached();
      this.element.remove();
    }, 500);
  }
}

@useView('./fs-navbar.html')
@customElement('fs-navbar')
export class FSNavBar {
  @bindable()
  navTitle = '';
}

@containerless()
@customElement('fs-nav-left')
@inlineView('<template><div slot="left" class="left"><slot></slot></div></template>')
export class FSNavLeft { }

@containerless()
@customElement('fs-nav-right')
@inlineView('<template><div slot="right" class="right"><slot></slot></div></template>')
export class FSNavRight { }


@containerless()
@customElement('fs-tool')
@inlineView('<template><a href="#" click.trigger="__fireClick()" data-panel="${menuPanel}" class="link icon-only ${dataClass}"><slot><i class="icon ${iconClass}"></i></slot></a></template>')
export class FSNavTool {
  iconClass = '';
  dataClass = '';

  @bindable()
  menuPanel = 'right';

  constructor(public element: Element) {
    if (element.hasAttribute('menu')) {
      this.iconClass = 'icon-bars';
      this.dataClass = 'open-panel';
    }
    else if (element.hasAttribute('back')) {
      this.dataClass = 'back';
      this.iconClass = 'icon-back';
    }
    else if (element.hasAttribute('close')) {
      this.iconClass = 'icon-close';
      this.dataClass = 'close-popup';
    }
    else if (element.hasAttribute('refresh')) {
      this.iconClass = 'icon-refresh';
    }
  }

  __fireClick() {
    return FSEvent.fireEvent('click', this.element);
  }
}

@customElement('fs-page-content')
@inlineView('<template class="page-content block"><div if.bind="hasPtr" class="pull-to-refresh-layer"><div class="preloader"></div><div class="pull-to-refresh-arrow"></div></div><slot></slot></template>')
export class FSPageContent {
  hasPtr = false;
  constructor(public element: Element) {
    if (this.hasPtr = this.element.hasAttribute('pull-to-refresh')) this.element.classList.add('pull-to-refresh-content');

    this.element['refreshDone'] = () => this.refreshDone();
    Dom7(this.element).on('refresh', e => FSEvent.fireEvent('refresh', this.element));
  }

  refreshDone() {
    framework7.pullToRefreshDone();
  }
}

@customElement('fs-toolbar')
@inlineView('<template class="toolbar toolbar-bottom"><div class="toolbar-inner"><slot></slot></div></template>')
export class FSToolbar { }

@customElement('fs-tab-content')
@inlineView('<template class="page-content block"><div class="tabs-animated-wrap"><div class="tabs"><slot></slot></div></div></template>')
export class FSTabContent { }

@customElement('fs-tabbar')
@inlineView('<template class="toolbar tabbar toolbar-bottom"><div class="toolbar-inner"><slot></slot></div></template>')
export class FSTabbar {
  constructor(private element: Element) {
    if (this.element.hasAttribute('with-labels')) this.element.classList.add('tabbar-labels');
  }
}

@customElement('fs-tab')
@inlineView('<template class="tab"><slot></slot></template>')
export class FSTab { }

@containerless()
@customElement('fs-tab-link')
@inlineView('<template><a href.bind="href" class="tab-link ${class}" click.trigger="__fireClick()"><i class="icon ${icon}"><span if.bind="badgeValue" class="badge ${badgeClass}">${badgeValue}</span></i><span if.bind="label" class="tabbar-label">${label}</span></template>')
export class FSTabLink {
  @bindable()
  href: string = '#';
  @bindable()
  class: string = '';
  @bindable()
  icon: string = '';
  @bindable()
  label: string = '';

  @bindable()
  badgeClass: string = '';
  @bindable()
  badgeValue: string = '';

  constructor(private element: Element) { }

  __fireClick() {
    return FSEvent.fireEvent('click', this.element);
  }
}

@customElement('fs-row')
@inlineView('<template class="row"><slot></slot></template>')
export class FSRow {
  constructor(public element: Element) {
    if (this.element.hasAttribute('top')) this.element.classList.add('row-top');
    if (this.element.hasAttribute('bottom')) this.element.classList.add('row-bottom');
    if (this.element.hasAttribute('middle')) this.element.classList.add('row-middle');
    if (this.element.hasAttribute('stretch')) this.element.classList.add('row-stretch');

    if (this.element.hasAttribute('start')) this.element.classList.add('row-start');
    if (this.element.hasAttribute('end')) this.element.classList.add('row-end');
    if (this.element.hasAttribute('center')) this.element.classList.add('row-center');
    if (this.element.hasAttribute('spaced')) this.element.classList.add('row-spaced');
  }
}

@customElement('fs-column')
@inlineView('<template style="${width?\'flex-basis:\'+width : \'\'}"><slot></slot></template>')
export class FSColumn {
  @bindable()
  width = '';

  constructor(public element: Element) {
    if (this.element.hasAttribute('auto')) this.element.classList.add('col-auto');
    else if (this.element.hasAttribute('fill')) this.element.classList.add('col-fill');

    if (this.element.hasAttribute('top')) this.element.classList.add('col-top');
    if (this.element.hasAttribute('bottom')) this.element.classList.add('col-bottom');
    if (this.element.hasAttribute('middle')) this.element.classList.add('col-middle');
    if (this.element.hasAttribute('stretch')) this.element.classList.add('col-stretch');
  }
}