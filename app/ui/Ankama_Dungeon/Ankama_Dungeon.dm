<module>
    <!-- Information about the module -->
    <header>
        <!-- Name displayed in modules list -->
        <name>Dungeon</name>
        
        <!-- Module's version -->
        <version>0.1</version>

        <!-- Last Dofus version that works with -->
        <dofusVersion>2.0</dofusVersion>

        <!-- Author of the module -->
        <author>Ankama</author>

        <!-- A short description -->
        <shortDescription>ui.module.dungeon.shortDesc</shortDescription>

        <!-- Detailled description -->
        <description></description>
	</header>

    <uis group="breach">
        <ui name="breachBossSelection" file="xml/breachBossSelection.xml" class="ui::BreachBossSelection"/>
        <ui name="breachTracking" file="xml/breachTracking.xml" class="ui::BreachTracking"/>
        <ui name="breachShop" file="xml/breachShop.xml" class="ui::BreachShop"/>
    </uis>
    <script>Dungeon.swf</script>
</module>