<module>
    <!-- Information about the module -->
    <header>
        <!-- Name displayed in modules list -->
        <name>GameUiCore</name>
        
        <!-- Module's version -->
        <version>0.1</version>

        <!-- Last Dofus version that works with -->
        <dofusVersion>2.0</dofusVersion>

        <!-- Author of the module -->
        <author>Ankama</author>

        <!-- A short description -->
        <shortDescription>ui.module.gameuicore.shortDesc</shortDescription>

        <!-- Detailled description -->
        <description></description>
	</header>
    
    <uis>
        <ui name="banner" file="xml/banner.xml" class="ui::Banner" />
        <ui name="bannerMenu" file="xml/bannerMenu.xml" class="ui::BannerMenu" />
        <ui name="actionBar" file="xml/actionBar.xml" class="ui::ActionBar" />
        <ui name="externalActionBar" file="xml/externalActionBar.xml" class="ui::ExternalActionBar" />
		<ui name="externalActionBarVertical" file="xml/externalActionBarVertical.xml" class="ui::ExternalActionBar" />
        <ui name="chat" file="xml/chat.xml" class="ui::Chat" />
        <ui name="smileys" file="xml/smileys.xml" class="ui::Smileys" />
        <ui name="mapInfo" file="xml/mapInfo.xml" class="ui::MapInfo" />
        <ui name="mainMenu" file="xml/mainMenu.xml" class="ui::MainMenu"/>
        <ui name="payZone" file="xml/payZone.xml" class="ui::PayZone"/>
        <ui name="buffUi"	file="xml/buffUi.xml" class="ui::BuffUi" />
        <ui name="fightModificatorUi"	file="xml/fightModificatorUi.xml" class="ui::FightModificatorUi" />
        <ui name="zoomUi"	file="xml/zoom.xml" class="ui::Zoom" />
        <ui name="rewardsAndGiftsUi"	file="xml/rewardsAndGiftsUi.xml" class="ui::RewardsAndGiftsUi" />
        <ui name="cinematic"	file="xml/cinematic.xml" class="ui::Cinematic" />
        
        <ui name="hardcoreDeath" file="xml/hardcoreDeath.xml" class="ui::HardcoreDeath"/>
        
        <ui name="report" 			file="xml/report.xml" class="ui::Report" />
		<ui name="externalnotification" file="xml/externalnotification.xml" class="ui::ExternalNotification"/>
		<ui name="achievementNotification" file="xml/achievementNotification.xml" class="ui::ExternalNotification"/>
		<ui name="questNotification" file="xml/questNotification.xml" class="ui::ExternalNotification"/>
		<ui name="offlineSales" file="xml/offlineSales.xml" class="ui::OfflineSales" />
		<ui name="prototype" file="xml/proto.xml" class="ui::Proto" />
    </uis>
    
    <shortcuts>shortcuts.xml</shortcuts>
    
    <script>GameUiCore.swf</script>
    
</module> 