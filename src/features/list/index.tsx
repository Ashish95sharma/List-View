import { Button, Drawer, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmptyState from '@components/EmptyState';
import ErrorState from '@components/ErrorState';
import Header from '@components/Header';
import LoadingState from '@components/LoadingState';
import Pagination from '@components/Pagination';
import ProductFilters from '@components/ProductFilters';
import ProductGrid from '@components/ProductGrid';
import { FILTER_SIDEBAR_WIDTH } from '@constants/ui.constants';
import {
  SERVER_FILTERS_INFO,
  SERVER_FILTERS_OFF_LABEL,
  SERVER_FILTERS_ON_LABEL
} from './constant';
import { useListHelper } from './list.helper';
import './list.scss';

const List = () => {
  const {
    filters,
    headerSearch,
    page,
    mobileFiltersOpen,
    isDesktop,
    useServerFilters,
    categories,
    brands,
    visibleProducts,
    totalPages,
    showLoading,
    isError,
    errorMessage,
    handleFiltersChange,
    handleHeaderSearchChange,
    handlePageChange,
    handleOpenMobileFilters,
    handleCloseMobileFilters,
    handleToggleServerFilters,
    handleRetry
  } = useListHelper();

  const filtersPanel = (
    <ProductFilters
      value={filters}
      categories={categories}
      brands={brands}
      onChange={handleFiltersChange}
    />
  );

  return (
    <div className="list">
      <Header
        search={headerSearch}
        onSearchChange={handleHeaderSearchChange}
        onMenuClick={handleOpenMobileFilters}
      />

      <div className="list__body">
        {isDesktop ? (
          <aside className="list__sidebar">{filtersPanel}</aside>
        ) : (
          <Drawer
            anchor="left"
            open={mobileFiltersOpen}
            onClose={handleCloseMobileFilters}
            PaperProps={{ sx: { width: FILTER_SIDEBAR_WIDTH } }}
          >
            <div className="list__drawer-header">
              <IconButton onClick={handleCloseMobileFilters} aria-label="close filters">
                <CloseIcon />
              </IconButton>
            </div>
            {filtersPanel}
          </Drawer>
        )}

        <main className="list__main">
          <div className="list__heading">
            <SearchIcon color="action" />
            <h2>Filters</h2>
          </div>

          {showLoading && <LoadingState />}

          {!showLoading && isError && (
            <ErrorState message={errorMessage} onRetry={handleRetry} />
          )}

          {!showLoading && !isError && visibleProducts.length === 0 && <EmptyState />}

          {!showLoading && !isError && visibleProducts.length > 0 && (
            <>
              <ProductGrid products={visibleProducts} />
              <div className="list__pagination">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={handlePageChange}
                />
              </div>
            </>
          )}
        </main>
      </div>

      <div className="list__server-toggle">
        <Button
          className="list__server-toggle-btn"
          variant={useServerFilters ? 'contained' : 'outlined'}
          color={useServerFilters ? 'primary' : 'inherit'}
          onClick={handleToggleServerFilters}
        >
          {useServerFilters ? SERVER_FILTERS_ON_LABEL : SERVER_FILTERS_OFF_LABEL}
        </Button>
        <Tooltip title={SERVER_FILTERS_INFO} arrow placement="top">
          <IconButton size="small" aria-label="About server filters" className="list__server-toggle-info">
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default List;
