import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import { MyApp } from "./app.component";
import {HttpModule, Http} from "@angular/http";
import {ConnectionService} from "../services/ilias-app.service";
import {ILIASRestProvider} from "../providers/ilias-rest.provider";
import {FooterToolbarService} from "../services/footer-toolbar.service";
import {FileService} from "../services/file.service";
import {DataProvider} from "../providers/data-provider.provider";
import {ObjectListPage} from "../pages/object-list/object-list";
import {FavoritesPage} from "../pages/favorites/favorites";
import {NewObjectsPage} from "../pages/new-objects/new-objects";
import {SettingsPage} from "../pages/settings/settings";
import {InfoPage} from "../pages/info/info";
import {MapPage} from "../learnplace/pages/map/map.component";
import {SynchronizationService} from "../services/synchronization.service";
import {DataProviderFileObjectHandler} from "../providers/handlers/file-object-handler";
import {FileSizePipe} from "../pipes/fileSize.pipe";
import {TranslateModule} from "ng2-translate/ng2-translate";
import {TranslateLoader} from "ng2-translate/src/translate.service";
import {TranslateStaticLoader} from "ng2-translate/src/translate.service";
import {ObjectDetailsPage} from "../pages/object-details/object-details";
import {LoginPage} from "../pages/login/login";
import {ModalPage} from "../pages/modal/modal";
import {SyncFinishedModal} from "../pages/sync-finished-modal/sync-finished-modal";
import {TokenUrlConverter} from "../services/url-converter.service";
import {BrowserModule} from "@angular/platform-browser";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {StatusBar} from "@ionic-native/status-bar";
import {FileTransfer} from "@ionic-native/file-transfer";
import {Network} from "@ionic-native/network";
import {File} from "@ionic-native/file";
import {SQLite} from "@ionic-native/sqlite";
import {Toast} from "@ionic-native/toast";
import {HttpILIASConfigFactory, ILIAS_CONFIG_FACTORY} from "../services/ilias-config-factory";
import {HttpClient} from "../providers/http";
import {CONFIG_PROVIDER, ILIASConfigProvider} from "../config/ilias-config";
import {
  ILIAS_REST, ILIASRestImpl, ILIASTokenManager,
  TOKEN_MANAGER
} from "../providers/ilias/ilias.rest";
import {OAUTH2_DATA_SUPPLIER, TOKEN_RESPONSE_CONSUMER} from "../providers/ilias/ilias.rest-api";
import {Oauth2DataSupplierImpl, TokenResponseConsumerImpl} from "../config/ilias.rest-config";
import {TabsPage} from "../learnplace/pages/tabs/tabs.component";
import {SplashScreen} from "@ionic-native/splash-screen";
import {TypeORMConfigurationAdapter} from "../config/typeORM-config";
import {DATABASE_CONFIGURATION_ADAPTER, DatabaseConnectionRegistry} from "../services/database/database.api";
import {Database} from "../services/database/database";
import {DB_MIGRATION, MIGRATION_SUPPLIER} from "../services/migration/migration.api";
import {SimpleMigrationSupplier, TypeOrmDbMigration} from "../services/migration/migration.service";
import {
  LEARNPLACE, LEARNPLACE_LOADER, LearnplaceObject, MUT_LEARNPLACE,
  RestLearnplaceLoader
} from "../learnplace/services/learnplace";
import {
  LEARNPLACE_REPOSITORY,
  TypeORMLearnplaceRepository
} from "../learnplace/providers/repository/learnplace.repository";
import {MAP_REPOSITORY, TypeORMMapRepository} from "../learnplace/providers/repository/map.repository";
import {LearnplacePage} from "../learnplace/pages/learnplace/learnplace.component";
import {ILIASLearnplaceAPI, LEARNPLACE_API} from "../learnplace/providers/rest/learnplace.api";
import {AlwaysStrategy, NeverStrategy} from "../learnplace/services/visibility/visibility.strategy";
import {VisibilityContextFactory} from "../learnplace/services/visibility/visibility.context";
import {MAP_SERVICE, VisibilityManagedMapService} from "../learnplace/services/map.service";
import {WifiFallbackScreen} from "./fallback/wifi/wifi-fallback.component";
import {LocationFallbackScreen} from "./fallback/location/location-fallback.component";
import {RoamingFallbackScreen} from "./fallback/roaming/roaming-fallback.component";
import {PegasusErrorHandler} from "./error-handler";
import {FallbackscreenErrorHandler} from "./fallback/fallbackscreen.error-handler";
import {HardwareFeaturePage} from "../pages/test-hardware-feature/test-hardware-feature";
import {NewsPage} from "../pages/news/news";
import {NEWS_REST, NewsRestImpl} from "../providers/ilias/news.rest";
import {USER_REPOSITORY, UserTypeORMRepository} from "../providers/repository/repository.user";
import {NEWS_FEED, NewsFeedImpl} from "../services/news/news.feed";
import {NEWS_SYNCHRONIZATION, NewsSynchronization, NewsSynchronizationImpl} from "../services/news/news.synchronization";
import {AuthTokenSupplier, INSTALLATION_LINK_PROVIDER, InstallationLinkSupplierImpl, TOKEN_SUPPLIER} from "../services/link/link-builder.supplier";
import {TIMELINE_LINK_BUILDER, TimelineLinkBuilderImpl} from "../services/link/timeline.builder";
import {DEFAULT_LINK_BUILDER, DefaultLinkBuilderImpl} from "../services/link/default.builder";
import {NEWS_LINK_BUILDER, NewsLinkBuilderImpl} from "../services/link/news.builder";
import {LOADING_LINK_BUILDER, LoadingLinkBuilderImpl} from "../services/link/loading.builder";
import {LOGIN_LINK_BUILDER, LoginLinkBuilderImpl} from "../services/link/login.builder";
import {RESOURCE_LINK_BUILDER, ResourceLinkBuilderImpl} from "../services/link/resource.builder";


export function createTranslateLoader(http: Http): TranslateStaticLoader {
  return new TranslateStaticLoader(http, "./assets/i18n", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    ObjectListPage,
    FavoritesPage,
    NewObjectsPage,
    SettingsPage,
    InfoPage,
    ObjectDetailsPage,
    LoginPage,
    FileSizePipe,
    SyncFinishedModal,
    ModalPage,
    NewsPage,

    /* from src/learnplace */
    LearnplacePage,
    MapPage,
    TabsPage,

    /* fallback screens */
    WifiFallbackScreen,
    LocationFallbackScreen,
    RoamingFallbackScreen,

    HardwareFeaturePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ObjectListPage,
    FavoritesPage,
    NewObjectsPage,
    SettingsPage,
    InfoPage,
    ObjectDetailsPage,
    LoginPage,
    SyncFinishedModal,
    NewsPage,

    /* from src/learnplace */
    LearnplacePage,
    MapPage,
    TabsPage,

    /* fallback screens */
    WifiFallbackScreen,
    LocationFallbackScreen,
    RoamingFallbackScreen,

    HardwareFeaturePage
  ],
  providers: [
    {
      provide: ILIAS_CONFIG_FACTORY,
      useClass: HttpILIASConfigFactory
    },

    /* from src/config/ilias-config */
    {
      provide: CONFIG_PROVIDER,
      useClass: ILIASConfigProvider
    },

    /* from src/providers/ilias/lias.rest */
    {
      provide: TOKEN_MANAGER,
      useClass: ILIASTokenManager
    },
    {
      provide: ILIAS_REST,
      useClass: ILIASRestImpl
    },

    /* from  src/providers/ilias/news.rest*/
    {
      provide: NEWS_REST,
      useClass: NewsRestImpl
    },

    /* from src/config/ilias.rest-config */
    {
      provide: OAUTH2_DATA_SUPPLIER,
      useClass: Oauth2DataSupplierImpl
    },
    {
      provide: TOKEN_RESPONSE_CONSUMER,
      useClass: TokenResponseConsumerImpl
    },

    /* from src/services/migration/migration.service */
    /* from src/services/migration/migration.api */
    {
      provide: DB_MIGRATION,
      useClass: TypeOrmDbMigration
    },

    {
      provide: MIGRATION_SUPPLIER,
      useClass: SimpleMigrationSupplier
    },

    /* from src/services/database.service */
    {
      provide: DATABASE_CONFIGURATION_ADAPTER,
      useClass: TypeORMConfigurationAdapter
    },
    DatabaseConnectionRegistry,
    Database,

    /* from src/services/news/news.feed */
    {
      provide: NEWS_FEED,
      useClass: NewsFeedImpl
    },
    /* from src/services/news/news.synchronization */
    {
      provide: NEWS_SYNCHRONIZATION,
      useClass: NewsSynchronizationImpl
    },

    /* from  src/providers/repository/repository.user*/
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeORMRepository
    },

    /* from src/learnplace */
    {
      provide: LEARNPLACE_REPOSITORY,
      useClass: TypeORMLearnplaceRepository
    },
    {
      provide: MAP_REPOSITORY,
      useClass: TypeORMMapRepository
    },
    {
      provide: LEARNPLACE,
      useClass: LearnplaceObject
    },
    {
      provide: MUT_LEARNPLACE,
      useExisting: LEARNPLACE
    },
    {
      provide: LEARNPLACE_LOADER,
      useClass: RestLearnplaceLoader
    },
    {
      provide: LEARNPLACE_API,
      useClass: ILIASLearnplaceAPI
    },
    {
      provide: MAP_SERVICE,
      useClass: VisibilityManagedMapService
    },

    /* Link service */
    {
      provide: INSTALLATION_LINK_PROVIDER,
      useClass: InstallationLinkSupplierImpl
    },
    {
      provide: TOKEN_SUPPLIER,
      useClass: AuthTokenSupplier
    },
    {
      provide: TIMELINE_LINK_BUILDER,
      useClass: TimelineLinkBuilderImpl
    },
    {
      provide: DEFAULT_LINK_BUILDER,
      useClass: DefaultLinkBuilderImpl
    },
    {
      provide: NEWS_LINK_BUILDER,
      useClass: NewsLinkBuilderImpl
    },
    {
      provide: LOADING_LINK_BUILDER,
      useClass: LoadingLinkBuilderImpl
    },
    {
      provide: LOGIN_LINK_BUILDER,
      useClass: LoginLinkBuilderImpl
    },
    {
      provide: RESOURCE_LINK_BUILDER,
      useClass: ResourceLinkBuilderImpl
    },
    AlwaysStrategy,
    NeverStrategy,
    VisibilityContextFactory,

    ConnectionService,
    ILIASRestProvider,
    FooterToolbarService,
    DataProvider,
    FileService,
    SynchronizationService,
    DataProviderFileObjectHandler,
    TokenUrlConverter,
    StatusBar,
    InAppBrowser,
    File,
    FileTransfer,
    Network,
    SQLite,
    Toast,
    HttpClient,
    SplashScreen,

    IonicErrorHandler,
    FallbackscreenErrorHandler,
    {provide: ErrorHandler, useClass: PegasusErrorHandler}
  ],
  exports: [
    TranslateModule
  ]
})
export class AppModule {}
