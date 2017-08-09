
fullpage-wrapper
    |
    |-- section			            // цепляет плагин
    |-- fp-section === fp-slide	    // не нужен
    |-- fp-table 			        // не нужен
    |-- fp-completely
        |
        |-- fp-tableCell            // цепляет класс скрола
            ----------------------- динамика -----------------------
            |	
            |-- fp-scrollable 	    // контейнер 
            |
            |-- fp-scroller 	    // контент который скролится
            ----------------------- динамика -----------------------
                |  
                |-- page-layout     // мой блок
                
              
                
            

.b_screen
    .e_inside


.scrolling
.scrolling__inside
.scrolling-rails_double
.scrolling-rails_single
.scrolling-rails__vertical
.scrolling-rails__horizontal
.scrolling__scroll-bar


z-index count:
+b('navigation') - 100
+b('btn-control') - 99
+b('layout-header') - 98 // onClick(navigation-control) - 101

