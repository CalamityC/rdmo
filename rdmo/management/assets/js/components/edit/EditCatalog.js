import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'react-bootstrap';

import Checkbox from '../forms/Checkbox'
import OrderedMultiSelect from '../forms/OrderedMultiSelect'
import Select from '../forms/Select'
import Text from '../forms/Text'
import Textarea from '../forms/Textarea'
import UriPrefix from '../forms/UriPrefix'

import { BackButton, SaveButton, CreateButton, DeleteButton } from '../common/ElementButtons'
import { DeleteElementModal } from '../common/ElementModals'

import useDeleteModal from '../../hooks/useDeleteModal'

const EditCatalog = ({ config, catalog, sites, groups, sections, elementActions }) => {

  const updateCatalog = (key, value) => elementActions.updateElement(catalog, key, value)
  const storeCatalog = () => elementActions.storeElement('catalogs', catalog)
  const deleteCatalog = () => elementActions.deleteElement('catalogs', catalog)

  const [showDeleteModal, openDeleteModal, closeDeleteModal] = useDeleteModal()

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <div className="pull-right">
          <BackButton />
          {
            catalog.id ? <SaveButton onClick={storeCatalog} />
                         : <CreateButton onClick={storeCatalog} />
          }
        </div>
        {
          catalog.id ? <div>
            <strong>{gettext('Catalog')}{': '}</strong>
            <code className="code-questions">{catalog.uri}</code>
          </div> : <strong>{gettext('Create catalog')}</strong>
        }
      </div>

      <div className="panel-body">
        <div className="row">
          <div className="col-sm-6">
            <UriPrefix config={config} element={catalog} field="uri_prefix" onChange={updateCatalog} />
          </div>
          <div className="col-sm-6">
            <Text config={config} element={catalog} field="uri_path" onChange={updateCatalog} />
          </div>
          <div className="col-sm-12">
            <Textarea config={config} element={catalog} field="comment" rows={4} onChange={updateCatalog} />
          </div>
          <div className="col-sm-6">
            <Checkbox config={config} element={catalog} field="locked" onChange={updateCatalog} />
          </div>
          <div className="col-sm-6">
            <Checkbox config={config} element={catalog} field="available" onChange={updateCatalog} />
          </div>
          <div className="col-sm-12">
            <OrderedMultiSelect config={config} element={catalog} field="sections"
                                options={sections} verboseName="section"
                                onChange={updateCatalog} />
          </div>
          <div className="col-sm-12">
            <Tabs id="#catalog-tabs" defaultActiveKey={0} animation={false}>
              {
                config.settings && config.settings.languages.map(([lang_code, lang], index) => {
                  return (
                    <Tab className="pt-10" key={index} eventKey={index} title={lang}>
                      <Text config={config} element={catalog} field={`title_${lang_code }`}
                            onChange={updateCatalog} />
                      <Textarea config={config} element={catalog} field={`help_${lang_code }`}
                                rows={4} onChange={updateCatalog} />
                    </Tab>
                  )
                })
              }
              <Tab className="pt-10" eventKey={config.settings.languages.length + 1} title={gettext('Visibility')}>
                <Select config={config} element={catalog} field="groups"
                        options={groups} onChange={updateCatalog} />
                <Select config={config} element={catalog} field="sites"
                        options={sites} onChange={updateCatalog} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="panel-footer">
        <div className="pull-right">
          <BackButton />
          {
            catalog.id ? <SaveButton onClick={storeCatalog} />
                       : <CreateButton onClick={storeCatalog} />
          }
        </div>
        {catalog.id && <DeleteButton onClick={openDeleteModal} />}
      </div>

      <DeleteElementModal title={gettext('Delete catalog')} show={showDeleteModal}
                          onClose={closeDeleteModal} onDelete={deleteCatalog}>
        <p>
          {gettext('You are about to permanently delete the catalog:')}
        </p>
        <p>
          <code className="code-questions">{catalog.uri}</code>
        </p>
        <p dangerouslySetInnerHTML={{
          __html: interpolate(gettext('This catalog is used in <b>%s projects</b>, which will not be usable afterwards.'), [catalog.projects_count])}} />
        <p className="text-danger">
          {gettext('This action cannot be undone!')}
        </p>
      </DeleteElementModal>
    </div>
  )
}



EditCatalog.propTypes = {
  config: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  sites: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  elementActions: PropTypes.object.isRequired
}

export default EditCatalog
